import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { requestValidator } from '../middlewares/request-validator';
import { BadRequestError } from '../types/errors';
const router = express.Router();

router.post(
  '/api/users/signup',
  body('email').isEmail().withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 chars'),
  requestValidator,
  async (req: Request, res: Response) => {
    // * Creating a user
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email already exists');
    }

    const user = User.build({ email, password });
    await user.save();

    // * create and return the jwt token
    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );
    req.session = {
      jwt: userJwt
    };

    return res.status(201).json({ message: 'User created!', user });
  }
);

export { router as signupRouter };
