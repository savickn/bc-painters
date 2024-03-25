
import _ from 'lodash';
import Role from './role.model';

// get all roles
export const getRoles = async (req, res) => {
  try {
    let roles = await Role.find(req.query)
      .populate('permissions', '_id name');
    return res.status(200).json({ roles });
  } catch(err) {
    return handleError(res, err);
  }
};

// update an existing role in the DB.
export const updateRole = async (req, res) => {
  try {
    let role = await Role.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {runValidators: true, new: true})
        .populate('permissions');
    return res.status(200).json({ role });
  } catch(err) {
    return handleError(res, err);
  }
};

/* create a new role
*/
export const createRole = async (req, res) => {
  if(req.body.name === null) {
    return res.status(404).send("Invalid POST body!");
  }
  
  try {
    let role = await Role.create(req.body);
    await role.populate('author', '_id name');
    return res.status(201).json({role});
  } catch(err) {
    return handleError(res, err);
  }
};

// delete a role.
export const deleteRole = async (req, res) => {
  try {
    await Role.findByIdAndRemove(req.params.id);
    return res.status(204).end();
  } catch(err) {
    return handleError(res, err);
  }
};

function handleError(res, err) {
  console.log(err);
  return res.status(404).send(err);
}
