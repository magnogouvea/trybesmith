import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  public loginService = new LoginService();

  public login = async (req: Request, res: Response) => {
    const token = await this.loginService.login(req.body);

    res.status(200).json({ token });
  };
}