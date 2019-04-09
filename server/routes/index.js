import { Router } from 'express';
import accountRouter from './accountRoute';

const router = new Router();

router.get('/', (req, res) => {
    res.status(200).json(
      { message: 'Welcome to Banka' },
    );
  });

router.use('/', accountRouter);

export default router;