import mysql from './connection';
import { IUserToken } from '../interfaces/IUserToken';
import { ILogin } from '../interfaces/ILogin';

export default class LoginModel {
  private connection = mysql;

  public async getByLogin(login: ILogin): Promise<IUserToken> {
    const { username, password } = login;
    const result = await this.connection.execute(
      'SELECT id, username FROM Trybesmith.Users WHERE username=? AND password=?',
      [username, password],
    );
    const [rows] = result;
    // console.log(rows);
    const [iUserToken] = rows as IUserToken[];
    return iUserToken;
  }
}