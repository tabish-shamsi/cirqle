import mongoose from "mongoose";

interface IMedia extends Document {
  _id: mongoose.Types.ObjectId;

  authorId: mongoose.Types.ObjectId;

  url: string;
  type: "image" | "video" | "story";
  fileId: string;

  width?: number
  height?: number
  duration?: number
  isUsed: boolean

  createdAt: Date;
  updatedAt: Date;
};

export default IMedia;
