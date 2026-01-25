import IProfile from "@/types/Profile";
import mongoose from "mongoose";

const profileSchema = new mongoose.Schema<IProfile>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", requried: true },
    bio: String,
    current_city: String,
    hometown: String,
    profession: String, 
    cover: { type: mongoose.Schema.Types.ObjectId, ref: "Media" },
    socials: [{ platform: String, url: String }],
}, { timestamps: true })

const Profile = mongoose.models.Profile || mongoose.model("Profile", profileSchema)
export default Profile