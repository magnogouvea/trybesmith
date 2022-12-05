import jwt from 'jsonwebtoken';
import HttpException from './http.exception';

require('dotenv/config');

const secret = process.env.JWT_SECRET;

const validateToken = (token: string) => {
  try {
    const data = jwt.verify(token, secret as string);

    return data;
  } catch (error) {
    throw new HttpException(401, 'Invalid token');
  }
};

export default validateToken;