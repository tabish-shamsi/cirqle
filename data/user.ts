import db from "@/lib/db"
import User from "@/models/User"
import "server-only"
import checkAuth from "./check-auth"
import { EMAIL_CHANGE_RESET_WINDOW } from "@/lib/constants" 

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

export const checkAllowChangeEmail = async () => {
    const { id } = await checkAuth()
    try {
        await db()
        const user = await User.findById(id)
        if (!user) return null

        return { allowChange: user.allowChangeEmail, lastChange: user.lastEmailChange }
    } catch (error: any) {
        throw new Error(error)
    }
}

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