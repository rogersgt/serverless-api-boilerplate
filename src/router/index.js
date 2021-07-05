import { Router } from 'express';

const router = new Router();

router.get('/status', (req, res) => {
  res.sendStatus(204);
});

export default router;
