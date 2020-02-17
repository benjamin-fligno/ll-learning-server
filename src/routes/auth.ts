import express, { Request, Response, Router, NextFunction } from 'express';
const router: Router = express.Router();

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  console.log(req);
  res.status(200).json({
    message: 'Handling GET requests to /auth/login'
  });
});

router.post('/register', (req: Request, res: Response, next: NextFunction) => {
  console.log(req);
  res.status(200).json({
    message: 'Handling POST requests to /auth/register'
  });
});

export default router;
