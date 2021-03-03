import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const [, token] = authorization.split(' ');

  try {
    jwt.verify(token, process.env.TOKEN_SECRET || '');

    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Token Expired or Invalid' });
  }
};
