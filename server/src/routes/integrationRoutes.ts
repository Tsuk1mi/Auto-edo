import express from 'express';
import { protect } from '../middleware/authMiddleware';
import * as integrationController from '../controllers/integrationController';

const router = express.Router();

// Применяем middleware защиты ко всем маршрутам интеграции
router.use(protect);

// Маршруты для получения токенов внешних систем
router.get('/grafana-token', integrationController.getGrafanaToken);
router.get('/ansible-token', integrationController.getAnsibleToken);

// Другие маршруты для интеграций можно добавить здесь

export default router;
