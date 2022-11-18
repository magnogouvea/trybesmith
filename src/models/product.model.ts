import { ResultSetHeader, RowDataPacket } from 'mysql2';
import mysql from './connection';
import { IProduct } from '../interfaces/IProduct';

export default class ProductModel {
  private connection = mysql;

  public async create(product: IProduct): Promise<IProduct> {
    const { name, amount } = product;
    
    const [products] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    const { insertId } = products;
    return { id: insertId, name, amount };
  }

  async getAll(): Promise<IProduct[]> {
    const [result] = await this.connection.execute<IProduct[] & RowDataPacket[]>(`
    SELECT * FROM Trybesmith.Products
    `);

    return result;
  }
}