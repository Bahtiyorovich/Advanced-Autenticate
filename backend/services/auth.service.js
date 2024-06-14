import UserDto from "../dtos/user.dto.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";


class AuthService {
  async createUser(email, password){
    const finduser = await User.findOne({ email });
    if(finduser) throw new Error(`User ${email} already registered`)
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email: email, password: hashedPassword});
    const userDto = new UserDto({...user})
    return {userDto};
  }
}
const authService = new AuthService();
export default authService;