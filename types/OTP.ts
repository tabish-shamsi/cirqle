import mongoose from "mongoose";

interface IOTP extends Document {
  userId: mongoose.Types.ObjectId;
  code: string;
  expiresAt: Date;
  type: "email_verification" | "recover_account";
}

export default IOTP;
