import express, { Request, Response, NextFunction } from "express";
import {NotFoundError} from './expressError';
import cors from 'cors';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import messageRoutes from './routes/messages'
import courtLocationRoutes from "./routes/court_locations";
import {authenticateJWT} from "./middleware/auth";



const app = express();
app.use(cors({
  origin: "*", // Allows requests from any origin (for development)
}));
app.use(express.json());
app.use(authenticateJWT);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/messages', messageRoutes);
app.use('/court_locations', courtLocationRoutes);


/** Handle 404 errors -- this matches everything */
app.use((req: Request, res: Response, next: NextFunction) => {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  let message;
  if (err.error) {
     message = err.error;
  }
  else {
    message = err.stack
  }
  res.status(status).json({
    error: { message, status },
  });
});

export default app;
