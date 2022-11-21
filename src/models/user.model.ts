import { ResultSetHeader } from 'mysql2';
import mysql from './connection';
import { IUser } from '../interfaces/IUser';
import { IUserToken } from '../interfaces/IUserToken';

export default class UserModel {
  private connection = mysql;

  public async create(user: IUser): Promise<IUserToken> {
    const { username, classe, level, password } = user;

    const [users] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
    const { insertId } = users;
    return { id: insertId, username, classe, level };
  }
}