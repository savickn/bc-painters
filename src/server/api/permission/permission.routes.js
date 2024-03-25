import { Router } from 'express';
import * as controller from './permission.controller';
import * as auth from '../../auth/auth.service';
const router = new Router();

router.get('/', controller.getPermissions);
router.post('/', controller.createPermission);
router.delete('/:id', controller.deletePermission);

export default router;
