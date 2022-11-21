import jsonwebtoken from 'jsonwebtoken';
import { IUser } from '../interfaces/IUser';
import { IUserToken } from '../interfaces/IUserToken';
import UserModel from '../models/user.model';

export default class UserService {
  public userModel = new UserModel();

  public jwt = jsonwebtoken;

  public async create(user: IUser): Promise<IUser> {
    return this.userModel.create(user);
  }
  
  public generateToken(user: IUserToken) {
    const payload = { username: user.username,
      classe: user.classe,
      level: user.level,
      password: user.password };
    return this.jwt.sign(
      payload, 
      process.env.JWT_SECRET as string,
      { algorithm: 'HS256', expiresIn: '1d' },
    );
  }
}