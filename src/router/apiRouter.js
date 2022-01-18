import { Router } from 'express';
import * as dbService from '../services/dbService';
import logger from '../logger';

const router = Router();

router.get('/:PK', (req, res) => {
  const { params } = req;
  const { PK } = params;

  return dbService.query(PK)
  .then((results) => res.status(200).send(results))
  .catch((e) => {
    logger.error(e);
    return res.status(500).send(e.message);
  });
});

router.get('/:PK/:SK', (req, res) => {
  const { params, query = {} } = req;
  const { PK, SK } = params;

  return dbService.query(PK, SK, query)
  .then((results) => res.status(200).send(results))
  .catch((e) => {
    logger.error(e);
    return res.status(500).send(e.message);
  });
});

router.post('/:PK', (req, res) => {
  const { body: item, params } = req;
  const { PK } = params;
  return dbService.create(PK, undefined, item)
    .then((saveResp) => res.status(200).send(saveResp))
    .catch((e) => {
      logger.error(e);
      return res.status(500).send(e.message);
    });
});

router.post('/:PK/:SK', (req, res) => {
  const { body: item, params } = req;
  const { PK, SK } = params;
  return dbService.create(PK, SK, item)
    .then((saveResp) => res.status(200).send(saveResp))
    .catch((e) => {
      logger.error(e);
      return res.status(500).send(e.message);
    });
});

router.put('/:PK/:SK', (req, res) => {
  const { body: item, params } = req;
  const { PK, SK } = params;
  return dbService.update({ PK, SK }, item)
    .then((updateResp) => res.status(200).send(updateResp))
    .catch((e) => {
      logger.error(e);
      return res.status(500).send(e.message);
    });
});

router.delete('/:PK/:SK', (req, res) => {
  const { PK, SK } = req.params;
  return dbService.deleteItem(PK, SK)
    .then(() => res.status(201).send())
    .catch((e) => {
      logger.error(e);
      return res.status(500).send(e.message);
    });
});

export default router;
