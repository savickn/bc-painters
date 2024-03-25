
import _ from 'lodash';

import { signToken } from '../../auth/auth.service';
import User from './user.model';


/* search for users */
export const getUsers = async (req, res) => {
  let query = req.query || {};

  try {
    const users = await User.find(query)
                    .select('-salt -hashedPassword -provider')
                    .populate('roles');
    return res.status(200).json({ users });
  } catch(err) {
    return handleError(res, err);
  }
};


/* get all data for one user */
export const getUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id)
                  .select('-salt -hashedPassword -provider');
    return res.status(200).json({ user });
  } catch(err) {
    return handleError(res, err);
  }
};


// update an existing user in the DB.
export const updateUser = async (req, res) => {
  try {
    let user = await User.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true})
        .select('-salt -hashedPassword -provider')
        .populate('roles');
    return res.status(200).json({ user });
  } catch(err) {
    return handleError(res, err);
  }
};


/* Used to create a new database entry for a User (also returns JWT for auth)
*  Password
*  Name
*  Email
*/
export const createUser = async (req, res) => {
  /* should perform validation of 'req.body' fields (e.g. must have Name/Email/Password) */

  try {
    let userObj = {
      provider: 'local',
      role: 'user'
    };
    let newUser = _.merge(userObj, req.body);
    let user = await User.create(newUser);
    let token = signToken(user._id);
    return res.status(201).json({ token, user: {
      name: user.name,
      role: user.role,
      _id: user._id
    } });
  } catch(err) {
    return handleError(res, err);
  }
};

// used to retrieve the currently logged-in user via JSON token 
export const getMe = async (req, res) => {
  try {
    let user = User.findOne({_id: req.user._id})
      .select('-salt -hashedPassword -provider')
      .populate({
        path: 'roles',
        populate: {
          path: 'permissions'
        }
      });
    if(!user) return res.status(401).send('Unauthorized');
    return res.status(200).json({user});
  } catch(err) {
    return handleError(res, err);
  }
};

/* delete a User */
export const deleteUser = async (req, res) => {
  try {
    await User.findOneAndRemove({_id: req.params.id});
    return res.status(204).end();
  } catch(err) {
    return handleError(res, err);
  }
};


function handleError(res, err) {
  return res.status(404).json({ message: err });
}
