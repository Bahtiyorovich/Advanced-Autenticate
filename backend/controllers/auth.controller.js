import authService from "../services/auth.service.js";

class AuthController {
  async register(req, res, next){
    try {
      const { email, password } = req.body;
      const data = await authService.createUser(email, password);
      return res.status(200).json(data);
    } catch (error) {
      console.log(error)
    }
  }


  async activation(req, res, next){}

}
const authController = new AuthController();
export default authController;