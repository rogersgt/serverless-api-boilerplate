import { Router } from 'express';
import logger from '../logger';
import apiRouter from './apiRouter';

const router = Router();

router.use((req, res, next) => {
  const { url, body, method } = req;
  logger.debug({
    url,
    body,
    method,
  });
  next();
});

router.use('/api', apiRouter);

export default router;
