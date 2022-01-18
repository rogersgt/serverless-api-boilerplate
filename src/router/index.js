import { Router } from 'express';
import logger from '../logger';
import apiRouter from './apiRouter';
import cfRouter from './cloudformationRouter';
import viewsRouter from './viewsRouter';
import ssmRouter from './ssmRouter';
import infoRouter from './infoRouter';
import authRouter from './authRouter';

const {
  COGNITO_LOGIN_URL,
  COGNITO_CLIENT_ID,
  DOMAIN_NAME,
} = process.env;

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

router.get('/login', (req, res) => {
  const cognitoLoginUri = `${COGNITO_LOGIN_URL}/login?client_id=${COGNITO_CLIENT_ID}&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${DOMAIN_NAME}`;
  return res.status(301).redirect(cognitoLoginUri);
});

router.use('/auth', authRouter);

router.use('/api/cloudformation', cfRouter);
router.use('/api/ssm', ssmRouter);
router.use('/api/info', infoRouter);
router.use('/api', apiRouter);

router.use('/', viewsRouter);

export default router;
