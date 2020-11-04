import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  time: { type: Date },
  message: { type: String, required: true },
});

export default mongoose.model('Comment', commentSchema);
