import UserDto from "../dtos/user.dto.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import Token from './token.service.js';
import Mail from "./mail.service.js";
import BaseError from './../errors/base.error.js';


class AuthService {
  async createUser(email, password){
    const finduser = await User.findOne({ email });
    if(finduser) throw BaseError.BadRequest(`User ${email} already registered`)
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email: email, password: hashedPassword});

    const userDto = new UserDto(user)
    // email service
    await Mail.sendMail(email, `${process.env.API_URL}/api/auth/activation/${userDto.id}`)

    const tokens = Token.generateToken({...userDto})
    await Token.saveToken(userDto.id, tokens.refreshToken);
    return {user:userDto, ...tokens};
  }

  async activatedUser(userId){
    const findByIduser = await User.findById(userId)
    if(!findByIduser) throw BaseError.BadRequest(`User ${userId} is not defined`)

    findByIduser.isActivated = true

    await findByIduser.save()
  }

  async loginUser(email, password){
    const user = await User.findOne({email})
    if(!user) throw BaseError.BadRequest(`User is not defined`)
    const isPassword = await bcrypt.compare(password, user.password)
    if(!isPassword) throw BaseError.BadRequest('Invalid email or password')
    
    const userDto = new UserDto(user)

    const tokens = Token.generateToken({...userDto})
    await Token.saveToken(userDto.id, tokens.refreshToken);
    return {user:userDto, ...tokens};

  }

  async logoutUser(refreshToken){
    return await Token.removeToken(refreshToken);
  }

  async refreshUser(refreshToken){
    if(!refreshToken){
      throw BaseError.UnauthorizedError('Bad authorization')
    }

    const userPayload = Token.validateRefreshToken(refreshToken)
    console.log('userPayload: ',userPayload)
    const tokenDB = await Token.findToken(refreshToken)

    if(!userPayload || !tokenDB) throw BaseError.UnauthorizedError('Bad authorization')

    const user = await User.findById(userPayload.id)

    const userDto = new UserDto(user)

    const tokens = Token.generateToken({...userDto}) 
    await Token.saveToken(userDto.id, tokens.refreshToken)

    return {user: userDto, ...tokens}
  }

  async getUser(){
    return await User.find();
  }
}
const authService = new AuthService();
export default authService;