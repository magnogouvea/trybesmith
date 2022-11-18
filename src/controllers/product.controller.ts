import { Request, Response } from 'express';
import ProductService from '../services/product.service';

export default class ProductController {
  public productService = new ProductService();

  public create = async (req: Request, res: Response) => {
    const product = req.body;
    
    const newProduct = await this.productService.create(product);

    return res.status(201).json(newProduct);
  };

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.productService.getAll();
    res.status(200).json(products);
  };
}