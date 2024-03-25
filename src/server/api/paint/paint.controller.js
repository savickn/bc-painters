
import Paint from './paint.model';

/* get all paints */
export const getPaints = async (req, res) => {
  let query = req.query || {};

  try {
    const paints = await Paint.find(query);
    return res.status(200).json({ paints });
  } catch(err) {
    return handleError(res, err);
  }
};

/* update a specific paint */
export const updatePaint = async (req, res) => {
  try {
    let paint = await Paint.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {runValidators: true, new: true});
    return res.status(200).json({ paint });
  } catch(err) {
    return handleError(res, err);
  }
};


function handleError(res, err) {
  return res.status(404).json({ message: err});
};
