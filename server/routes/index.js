import { Router } from 'express';
import accountRouter from './accountRoute';
import userRouter from './userRoute';

const router = new Router();

router.get('/', (req, res) => {
  res.status(200).json(
    { message: 'Welcome to Banka' },
  );
});

router.use('/', accountRouter);
router.use('/', userRouter);

export default router;
