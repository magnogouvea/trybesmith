import { ILogin } from '../interfaces/ILogin';
import LoginModel from '../models/login.model';
import UserService from './user.service';
import HttpException from '../utils/http.exception';

export default class LoginService {
  public loginModel = new LoginModel();

  public userService = new UserService();

  public async login(login: ILogin) {
    const newLogin = await this.loginModel.getByLogin(login);

    if (!newLogin) throw new HttpException(401, 'Username or password invalid');
    const token = this.userService.generateToken(newLogin);
    console.log(token);
    
    return token;
  }
}
