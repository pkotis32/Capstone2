import express, { Request, Response, NextFunction } from "express";
import {NotFoundError} from './expressError';
import cors from 'cors';
const corOptions = {
  origin: ["http://localhost:5173"],
};
import authRoutes from './routes/auth';


const app = express();
app.use(cors(corOptions));
app.use(express.json());


app.use('/auth', authRoutes);





app.get("/", (req: Request, res: Response) => {
  res.json("Hello from Express!");
});

/** Handle 404 errors -- this matches everything */
app.use((req: Request, res: Response, next: NextFunction) => {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.error;

  res.status(status).json({
    error: { message, status },
  });
});

export default app;
