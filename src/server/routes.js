
import path from 'path';

import userRoutes from './api/user/user.routes';
import roleRoutes from './api/role/role.routes';
import permissionRoutes from './api/permission/permission.routes';
import paintRoutes from './api/paint/paint.routes';

import authRoutes from './auth/auth.routes';

// register HTTP endpoints
export default function(app) {
  app.use('/api/users', userRoutes);
  app.use('/api/roles', roleRoutes);
  app.use('/api/permissions', permissionRoutes);
  app.use('/api/paints', paintRoutes);
  
  app.use('/auth', authRoutes);


  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(app.get('appPath'), 'index.html'));
  });
}
