import TokenModel from './../models/token.model.js';
import jsonwebtoken from 'jsonwebtoken'
let jwt = jsonwebtoken
class TokenService {
  
  generateToken(payload){
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, { expiresIn: "10m" })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, { expiresIn: "30d"})

    return { accessToken, refreshToken }
  }

  async saveToken(userId, refreshToken) {
    const existToken = await TokenModel.findOne({ user: userId })

    if(existToken){
      existToken.refreshToken = refreshToken
      return existToken.save();
    }

    const token = await TokenModel.create({ user: userId, refreshToken })

    return token;
  }

  async removeToken(refreshToken) {
    return await TokenModel.findOneAndDelete({refreshToken})
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_KEY)
    } catch (error) {
      return null;
    }
  }

  async findToken(refreshToken) {
    return await TokenModel.findOne({refreshToken})
  }

  validateAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_KEY)
    } catch (error) {
      return null;
    }
  }
}

const Token = new TokenService();
export default Token;