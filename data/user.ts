import db from "@/lib/db"
import User from "@/models/User"
import "server-only"
import checkAuth from "./check-auth"

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
        if(!user) return null

        return user.allowChangePassword
    } catch (error: any) {
        throw new Error(error)
        
    }
}