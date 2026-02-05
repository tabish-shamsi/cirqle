interface IMedia extends Document {
  _id: string;

  authorId: string;

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
