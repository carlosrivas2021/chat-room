import mongoose from 'mongoose';

const { Schema } = mongoose;

const messageSchema = new mongoose.Schema({
  conversation: {
    type: Schema.Types.ObjectId,
    ref: 'Conversation',
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  body: { type: 'string' },
  createdAt: {
    type: String,
    default: new Date(),
  },
});

export const Message = mongoose.model('Message', messageSchema);
