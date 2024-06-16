import authService from "../services/auth.service.js";

class AuthController {
  async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await authService.createUser(email, password);
      res.cookie('refreshToken', data.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
      return res.status(200).json(data);
    } catch (error) {
     next(error)
    }
  }

  async activation(req, res, next) {
    try {
      const userId = req.params.id
      await authService.activatedUser(userId)
      return res.redirect(process.env.CLIENT_URL)
    } catch (error) {
     next(error)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const data = await authService.loginUser(email, password)
      res.cookie('refreshToken', data.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
      return res.status(200).json(data)
    } catch (error) {
     next(error)
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      await authService.logoutUser(refreshToken)
      res.clearCookie('refreshToken')
      return res.status(200).json('logout successfully')
    } catch (error) {
     next(error)
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const data = await authService.refreshUser(refreshToken)
      res.cookie('refreshToken', data.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
      return res.status(200).json(data)
    } catch (error) {
     next(error)
    }
  }

  async getUsers(req, res, next){
    try {
      const data = await authService.getUser()
      return res.json(data);
    } catch (error) {
      next(error)
    }
  }
}
const authController = new AuthController();
export default authController;