
import express, { Router } from 'express';
import { CardController } from '../controllers/cardController';

const router: Router = express.Router();


router.post('/validate-card', (req, res) => {
  CardController.validateCard(req, res);
});

export default router;