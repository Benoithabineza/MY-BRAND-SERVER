import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  likes: { type: Number },
  commentsCount: { type: Number, default: 0 },
  comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
  picture: { type: String },
  time: { type: Date },
  views: { type: Number },
});

export default mongoose.model('Blog', blogSchema);
