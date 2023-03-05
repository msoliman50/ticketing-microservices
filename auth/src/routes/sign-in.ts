import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { requestValidator } from '../middlewares/request-validator';

import { User } from '../models/user';
import { BadRequestError } from '../types/errors';
import Password from '../utils/password';
const router = express.Router();

router.post(
  '/api/users/signin',
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().notEmpty().withMessage('Password must be applied'),
  requestValidator,
  async (req: Request, res: Response) => {
    // * Creating a user
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    if (!(await Password.compare(existingUser.password, password))) {
      throw new BadRequestError('Invalid credentials');
    }

    // * return the jwt token
    const userJwt = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY!
    );
    req.session = {
      jwt: userJwt
    };

    return res
      .status(200)
      .json({ message: 'Logged in successfully', user: existingUser });
  }
);

export { router as signinRouter };
