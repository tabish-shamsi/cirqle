"use server"

import checkAuth from "@/data/check-auth"
import { EMAIL_CHANGE_RESET_WINDOW } from "@/lib/constants"
import db from "@/lib/db"
import User from "@/models/User"

export default async function changeEmail() {
    try {
        const { id } = await checkAuth()

        await db()
        const user = await User.findById(id)

        if (!user) return { error: "User not found" }

        if (user.lastEmailChange) {
            const now = Date.now()
            const lastChange = user.lastEmailChange.getTime()

            if (lastChange > now) {
                return { error: "Email change temporarily unavailable. Please contact support." };
            }

            const timeSinceLastChange = Date.now() - lastChange
            const changedWithin30Days = timeSinceLastChange < EMAIL_CHANGE_RESET_WINDOW;

            if (changedWithin30Days) {
                return { error: "You can only change your email after every 30 days." }
            }
        }

        if (!user.allowChangeEmail) return { error: "Please verify your old email first to continue" }
        if (!user.newEmail) return { error: "New email not found." }

        user.email = user.newEmail
        user.newEmail = null
        user.allowChangeEmail = false
        user.lastEmailChange = new Date()

        await user.save()
        return { success: true, message: "Email has been changed" }
    } catch (error) {
        console.error(error)
        return { error: "Something went wrong while changing email." }
    }
}