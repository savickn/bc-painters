
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  permissions: [{
    type: Schema.Types.ObjectId,
    ref: 'Permission'
  }],
});

export default mongoose.model('Role', RoleSchema);
