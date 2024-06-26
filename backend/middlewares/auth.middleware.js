import BaseError from "../errors/base.error.js";
import Token from "../services/token.service.js";

const authMiddleware = (req, res, next) =>{
  try {
    const authorization = req.headers.authorization
    if(!authorization){ return next(BaseError.UnauthorizedError())}

    const accessToken = authorization.split(' ')[1]
    if(!accessToken){
      return next(BaseError.UnauthorizedError())
    }

    const userData = Token.validateAccessToken(accessToken)
    if(!userData){
      return next(BaseError.UnauthorizedError())
    }

    req.user = userData
    next()
  } catch (error) {
    return next(BaseError.UnauthorizedError());
  }
}

export default authMiddleware;