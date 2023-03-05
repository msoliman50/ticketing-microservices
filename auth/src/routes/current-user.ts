import express, { Request, Response } from 'express';

import { userValidator } from '../middlewares/user-validator';

const router = express.Router();

router.get(
  '/api/users/currentuser',
  userValidator,
  (req: Request, res: Response) => {
    return res.json({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
