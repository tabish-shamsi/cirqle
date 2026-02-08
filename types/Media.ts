import mongoose from "mongoose";

interface IMedia extends Document {
  _id: string;

  authorId: mongoose.Types.ObjectId;

  url: string;
  type: "image" | "video";
  fileId: string;

  width?: number;
  height?: number;
  duration?: number;
  isUsed: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export default IMedia;
