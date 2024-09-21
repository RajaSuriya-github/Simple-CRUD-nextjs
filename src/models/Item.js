/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this item.'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this item.'],
  },
});

export default mongoose.models.Item || mongoose.model('Item', ItemSchema);
