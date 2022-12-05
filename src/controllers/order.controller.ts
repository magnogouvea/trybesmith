import { Request, Response } from 'express';
import OrderService from '../services/order.service';
import HttpException from '../utils/http.exception';
import schemaMiddleware from '../middlewares/schema.middleware';

export default class OrderController {
  public orderService = new OrderService();

  public getAll = async (_req: Request, res: Response) => {
    const order = await this.orderService.getAll();
    return res.status(200).json(order);
  };

  public create = async (req: Request, res: Response) => {
    const { user, ...resto } = req.body;
    const userId = user.id;
    const dataToCreate = { ...resto, userId };

    const { error } = schemaMiddleware.validate(resto);
    if (error) {
      const httpCode = error.message.includes('is required') ? 400 : 422;
      throw new HttpException(httpCode, error.message);
    }

    const created = await this.orderService.create(dataToCreate);

    if (!created) throw new HttpException(422, 'unexpected error');

    res.status(201).json(created);
  };
}