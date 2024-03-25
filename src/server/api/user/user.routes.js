import { Router } from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';
const router = new Router();

router.get('/', auth.hasPermission('User_READ'), controller.getUsers);
router.get('/:id', auth.hasPermission('User_READ'), controller.getUser);
router.post('/', auth.hasPermission('User_UPDATE'), controller.createUser);
router.get('/me', auth.isAuthenticated(), controller.getMe);
router.put('/:id', auth.hasPermission('User_UPDATE'), controller.updateUser);
router.delete('/:id', auth.hasPermission('User_DELETE'), controller.deleteUser);

export default router;
