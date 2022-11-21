import { RowDataPacket } from 'mysql2';
import { IOrders } from '../interfaces/IOrders';
import mysql from './connection';

export default class OrderModel {
  private connection = mysql;

  public async getAll(): Promise<IOrders[]> {
    const [result] = await this.connection.execute<IOrders[] & RowDataPacket[]>(
      `SELECT
          o.id AS id,
          o.userId AS userId,
          JSON_ARRAYAGG(p.id) AS productsIds
        FROM 
          Trybesmith.Orders AS o
        INNER JOIN
          Trybesmith.Products as p
          ON p.orderId = o.id
        GROUP BY id;`,
    );
    return result;
  }
}
