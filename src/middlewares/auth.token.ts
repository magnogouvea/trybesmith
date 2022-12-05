import { Request, Response, NextFunction } from 'express';
import validateToken from '../utils/jwt.utils';

export default function authToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const data = validateToken(authorization);
  req.body.user = data;

  next();
}