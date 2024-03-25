
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const PermissionSchema = new Schema({

  // maybe create 'name' from 'object' and 'type'
  name: {
    type: String,
    required: true,
    unique: true
  },

  // 
  object: {
    type: String,
    required: true,
  },

  // 
  type: {
    type: String,
    required: true,
    enum: ['READ', 'CREATE', 'UPDATE', 'DELETE']
  }
});

export default mongoose.model('Permission', PermissionSchema);
