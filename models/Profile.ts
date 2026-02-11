import IProfile from "@/types/Profile";
import mongoose from "mongoose";

const profileSchema = new mongoose.Schema<IProfile>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      requried: true,
    },
    bio: String,
    current_city: String,
    hometown: String,
    profession: String,
    cover: { type: mongoose.Schema.Types.ObjectId, ref: "Media" },
    socials: [{ platform: String, url: String }],
  },
  { timestamps: true },
);

profileSchema.index(
  {
    bio: "text",
    current_city: "text",
    hometown: "text",
    profession: "text",
  },
  {
    weights: {
      bio: 5, // more important
      profession: 3,
      current_city: 2,
      hometown: 2,
    },
  },
);

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);
export default Profile;
