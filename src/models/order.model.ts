import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { IOrders } from '../interfaces/IOrders';
import { ICreateOrder } from '../interfaces/ICreateOrder';
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

  public async insert(order : ICreateOrder) {
    const [{ insertId }] = await this.connection.execute<ICreateOrder & ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [order.userId],
    );

    if (insertId) {
      await Promise.all(order.productsIds.map(async (id) => {
        await this.connection.execute<ResultSetHeader>(
          `UPDATE Trybesmith.Products 
          SET orderId = ?
          WHERE id = ?;`,
          [insertId, id],
        );
      }));
      return true;
    }
    return false;
  }
}
