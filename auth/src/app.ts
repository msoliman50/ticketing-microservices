import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import {
  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter
} from './routes';
import { NotFoundError } from './types/errors';
import { errorHandler } from './middlewares/error-handler';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
);

// * auth routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// * Notfound handler
app.all('*', () => {
  throw new NotFoundError();
});

// * error handler
app.use(errorHandler);

export default app;
