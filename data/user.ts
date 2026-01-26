import db from "@/lib/db"
import User from "@/models/User"
import "server-only"
import checkAuth from "./check-auth"
import { EMAIL_CHANGE_RESET_WINDOW } from "@/lib/constants"
import Profile from "@/models/Profile"
import IProfile from "@/types/Profile"
import { Key } from "lucide-react"

export const findAccount = async (identifier: string) => {
    try {
        if (!identifier) return null

        await db()

        const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] }).select("name email avatar")

        if (!user) return null

        return JSON.parse(JSON.stringify(user))
    } catch (error: any) {
        throw new Error(error)
    }
}

// settings/password
export const checkAllowChangePassword = async () => {
    const { id } = await checkAuth()
    try {
        await db()
        const user = await User.findById(id)
        if (!user) return null

        return user.allowChangePassword
    } catch (error: any) {
        throw new Error(error)

    }
}

// settings/change-email
export async function getEmailChangeInfo() {
    const { id } = await checkAuth()
    await db()

    const user = await User.findById(id)

    if (!user) {
        throw new Error("User not found");
    }

    const now = Date.now();
    const lastChangeTime = user.lastEmailChange?.getTime() ?? null;

    let canChangeEmail = true;
    let remainingMs = 0;

    if (lastChangeTime) {
        const timeSinceLastChange = now - lastChangeTime;

        if (timeSinceLastChange < EMAIL_CHANGE_RESET_WINDOW) {
            canChangeEmail = false;
            remainingMs = EMAIL_CHANGE_RESET_WINDOW - timeSinceLastChange;
        }
    }

    return {
        email: user.email,
        canChangeEmail,
        remainingMs,
        lastEmailChange: user.lastEmailChange,
        allowChange: user.allowChangeEmail
    };
}

// settings/account-information
export async function getAccountInformation() {
    await db()
    const { id } = await checkAuth()
    const user = await User.findById(id).select("name username birthday")

    if (!user) throw new Error("User not found")

    const profile = await Profile.findOne({ userId: user._id })

    const accountInformation = {
        firstName: user.name.split(" ")[0],
        lastName: (user.name.split(" ").slice(1)).join(" "),
        username: user.username,
        birthday: user.birthday,
        hometown: profile?.hometown ?? "",
        current_city: profile?.current_city ?? "",
        profession: profile?.profession ?? "",
        bio: profile?.bio ?? "",
    }

    return accountInformation
}

// settings/socials
export async function getSocials() {
    const { id } = await checkAuth()

    await db()
    const profile = await Profile.findOne({ userId: id }) as IProfile
    if (!profile || !profile.socials || profile.socials.length <= 0) return {
        facebook: "",
        twitter: "",
        instagram: "",
        youtube: "",
        linkedin: "",
        tiktok: "",
    }

    const socialsObj = profile.socials.reduce((acc: Record<string, string>, item) => {
        acc[item.platform.toLowerCase()] = item.url
        return acc
    }, {} as Record<string, string>)

    return socialsObj
}