
import _ from 'lodash';
import Permission from './permission.model';

// get all permissions
export const getPermissions = async (req, res) => {
  try {
    let permissions = await Permission.find(req.query);
    return res.status(200).json({ permissions });
  } catch(err) {
    return handleError(res, err);
  }
};

// create a new permission
export const createPermission = async (req, res) => {
  if(req.body.object === null || req.body.type === null) {
    return res.status(404).send("Invalid POST body!");
  }
  
  try {
    let permissionObj = req.body;
    permissionObj.name = `${req.body.object}_${req.body.type}`;
    let permission = await Permission.create(permissionObj);
    return res.status(201).json({ permission });
  } catch(err) {
    return handleError(res, err);
  }
};

// delete a permission
export const deletePermission = async (req, res) => {
  try {
    await Permission.findByIdAndRemove(req.params.id);
    return res.status(204).end();
  } catch(err) {
    return handleError(res, err);
  }
};


function handleError(res, err) {
  return res.status(404).json({ message: err });
};


