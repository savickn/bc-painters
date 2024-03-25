import config from '../config/environment';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';
import User from '../api/user/user.model';
const validateJwt = expressJwt({ secret: config.secrets.session, algorithms: ["HS256"] });

/**
 * Sets 'req.user' if authenticated, else returns 401
 */
export function isAuthenticated() {
  return compose()
    // used to validate jwt of user session
    // requires that the 'authorization' header be set to 'Bearer ${token}'
    .use(function(req, res, next) { 
      // allows 'access_token' to be passed through 'req.query' if necessary  
      if(req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
     //used to attach 'user' to 'req'
    .use(function(req, res, next) {
      User.findById(req.user._id)
        .populate({
          path: 'roles',
          populate: {
            path: 'permissions'
          }
        })
        .then(user => {
          if (!user) return res.status(401).send('Unauthorized');
          req.user = user;
          next();
        })
        .catch(err => next(err))
    });
}

/*
** used to check if currentUser is the author of the accessed material
*/
export function correctUser(className) {
  if (!className) throw new Error('Class name needs to be set');
  var objUser = '';

  className.findById(req.params.id)
    .then(obj => {
      if (!obj.user) return res.status(401).send('Unauthorized');
      objUser = obj.user;
    })
    .catch(err => next(err));

  return compose()
    .use(function checkUser(req, res, next) {
      if (req.user === objUser) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 * else returns 403
 */
export function hasRole(roleRequired) {
  if (!roleRequired) throw new Error('Required role needs to be set');

  return compose()
    .use(isAuthenticated())
    .use((req, res, next) => {
      if (req.user.roles.filter(role => role.name === roleRequired).length > 0) {
        next();
      }
      else {
        res.status(403).send('Forbidden');
      }
    });
}

/**
 * Checks if the role has permission
 * else returns 403
 */
export function hasPermission(permission) {
  if (!permission) throw new Error('Permission needs to be set');

  return compose()
    .use(isAuthenticated())
    .use((req, res, next) => {
      if (req.user.roles.filter(role => roleHasPermission(role, permission)).length > 0) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
    });
}


/**
 * Returns a jwt token signed by the app secret
 */
export function signToken(id) {
  return jwt.sign({ _id: id }, config.secrets.session, { expiresIn: '5h' });
}

/**
 * Set token cookie directly for oAuth strategies
 */
export function setTokenCookie(req, res) {
  if (!req.user) return res.status(404).json({ message: 'Something went wrong, please try again.'});
  var token = signToken(req.user._id);
  res.cookie('token', JSON.stringify(token));
  res.redirect('/');
}


// helper to check if Role 'r' has Permission 'p'
const roleHasPermission = (role, permissionName) => {
  return role.permissions.filter(permission => permission.name === permissionName).length > 0;
}
