import { Router } from 'express';
import logger from '../logger';
import apiRouter from './apiRouter';

const router = Router(); // eslint-disable-line new-cap

router.use((req, res, next) => {
  const { url, body, method } = req;
  logger.debug({
    url,
    body,
    method,
  });
  next();
});

router.use('/', apiRouter);

export default router;
