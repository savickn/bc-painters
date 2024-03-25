import { Router } from 'express';
import * as controller from './paint.controller';
import * as auth from '../../auth/auth.service';
const router = new Router();

router.get('/', auth.hasPermission('Paint_READ'), controller.getPaints);
router.put('/:id', auth.hasPermission('Paint_UPDATE'), controller.updatePaint);

export default router;
