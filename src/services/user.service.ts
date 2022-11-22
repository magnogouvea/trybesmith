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
  
  public async generateToken(user: IUserToken) {
    return this.jwt
      .sign(
        { id: user.id, username: user.username }, 
        process.env.JWT_SECRET as string, 
        { algorithm: 'HS256', expiresIn: '7d' },
      );
  }
}