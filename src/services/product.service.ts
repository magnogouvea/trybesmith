import ProductModel from '../models/product.model';
import { IProduct } from '../interfaces/IProduct';

export default class ProductService {
  public NewProduct = new ProductModel();

  public async getAll(): Promise<IProduct[]> {
    const product = await this.NewProduct.getAll();
    return product;
  }

  public async create(product: IProduct): Promise<IProduct> {
    return this.NewProduct.create(product);
  }
}