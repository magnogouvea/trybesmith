import { Request, Response } from 'express';
import OrderService from '../services/order.service';

export default class OrderController {
  public orderService = new OrderService();

  public getAll = async (_req: Request, res: Response) => {
    const order = await this.orderService.getAll();
    return res.status(200).json(order);
  };
}