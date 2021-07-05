/* TO DO: Get Express Router to work here */

import logger from '../logger';
import routes from './routes';

export default function router(req, res) {
  const {
    url,
    method,
  } = req;
  logger.debug({ method, url });

  if (method === 'HEAD') {
    return res.sendStatus(204);
  }

  const route = routes.find((route) => route.url === url && route.method === method);
  if (route) {
    return route.handler(req.body)
      .then((resp) => res.send(resp))
      .catch((e) => {
        logger.error(e);
        return res.sendStatus(500);
      });
  }

  return res.sendStatus(404);
};

