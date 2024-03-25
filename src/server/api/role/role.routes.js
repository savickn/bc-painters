import { Router } from 'express';
import * as controller from './role.controller';
import * as auth from '../../auth/auth.service';
const router = new Router();

router.get('/', auth.hasPermission('Role_READ'), controller.getRoles);
router.post('/', auth.hasPermission('Role_UPDATE'), controller.createRole);
router.put('/:id', auth.hasPermission('Role_UPDATE'), controller.updateRole);
router.delete('/:id', auth.hasPermission('Role_DELETE'), controller.deleteRole);

export default router;
