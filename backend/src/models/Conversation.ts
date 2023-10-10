import mongoose from 'mongoose';

const { Schema } = mongoose;

const conversationSchema = new mongoose.Schema({
  members: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  hasSeenLatestMessage: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: String,
    default: new Date(),
  },
});

export const Conversation = mongoose.model('Conversation', conversationSchema);
