
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const PaintSchema = new Schema({
  color: {
    type: String,
    required: true,
    enum: ['blue', 'grey', 'black', 'white', 'purple']
  },

  status: {
    type: String,
    required: true,
    enum: ['available', 'running_low', 'out_of_stock'],
    default: 'available'
  },
});

export default mongoose.model('Paint', PaintSchema);
