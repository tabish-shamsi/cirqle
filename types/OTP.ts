import mongoose from "mongoose";

interface IOTP extends Document {
  userId: mongoose.Types.ObjectId;
  code: string;
  expiresAt: Date;
  type: "email_verification" | "change_password";
}

export default IOTP;
