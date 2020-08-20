import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import IUser from "../models/IUser";

import db from "../database/connection";

interface RegisterRequestBody {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

function encryptPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 8, function (error, hash) {
      if (error)
        reject(error);

      resolve(hash);
    });
  })
}

function generateToken(id: number) {
  const { JWT_SECRET } = process.env;
  const token = jwt.sign({ id }, JWT_SECRET as string, {
    expiresIn: 86400
  });
  return token;
}

export default class AuthController {
  async register(req: Request<any, any, RegisterRequestBody, any>, res: Response) {
    const {
      first_name,
      last_name,
      email,
      password,
      confirm_password
    } = req.body;

    //#region Validations
    if (!first_name)
      return res.status(400).json({ message: 'The first name is required' });

    if (!last_name)
      return res.status(400).json({ message: 'The last name is required' });

    if (!email)
      return res.status(400).json({ message: 'The email is required' });

    if (!password || !confirm_password)
      return res.status(400).json({ message: 'The password and the confirmation is required' });

    if (password !== confirm_password)
      return res.status(400).json({ message: 'The password and the confirmation do not match' });

    try {
      const users = await db('users')
        .where({ email })
        .count({ count: '*' })
        .first()

      if (users?.count)
        return res.status(400).json({ message: 'The email already exists' });
    } catch (error) {
      return res.status(500).json({ message: 'Error while validating email', error });
    }
    //#endregion

    try {
      const hash = await encryptPassword(password);

      const user: IUser = {
        first_name, last_name, email,
        password: hash
      };

      try {
        const [ id ] = await db('users').insert(user);
        user.id = id as number;

        return res.status(200).json({
          user,
          token: generateToken(user.id)
        });

      } catch (error) {
        return res.status(500).json({ message: 'Error while creating user', error });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error while encrypting password', error });
    }
  }

  async login(req: Request, res: Response) {
    const {
      email,
      password
    } = req.body;

    try {
      const user = await db('users')
        .where({ email })
        .select('*')
        .first()

      if (!user)
        return res.status(400).json({ message: 'Email not found' })

      if (!bcrypt.compareSync(password, user.password))
        return res.status(400).json({ message: 'Invalid password' })
      
      delete user.password;

      return res.json({
        user, 
        token: generateToken(user.id)
      });
    } catch (error) {
      return res.status(500).json({ message: 'Error while validating email and password', error });
    }
  }

  authMiddleare(req: Request, res: Response, next: NextFunction) {
    try {
      const auth = req.headers['authorization'];
  
      if (!auth)
        throw 'No token provided';
  
      const parts = auth.split(' ');
      if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer')
        throw 'Invalid token format';

      const [_, token] = parts;

      const { JWT_SECRET } = process.env;
      jwt.verify(token, JWT_SECRET as string, (error, decoded: any) => {
        if (error)
          throw 'Invalid token';

        if (decoded)
          req.headers["user-agent"] = decoded.id;

        return next();
      })
    } catch (error) {
      if (typeof(error) === 'string') {
        return res.status(401).json({ message: error });
      } else {
        return res.status(500).json({ error, message: 'Error while authenticating' });
      }
    }
  }
}