"use server"

import checkAuth from "@/data/check-auth";
import db from "@/lib/db";
import User from "@/models/User";
import { PasswordChangeType } from "@/types/types"

type PROPS = {
    email?: string;
    type: PasswordChangeType;
    password: string;
    oldPassword?: string
}
export default async function changePassword({ email, type, password, oldPassword }: PROPS) {
    try {
        let userEmail;
        if (type === "change_password") {
            if (!oldPassword) return { error: "Old password is required" }
            const { email } = await checkAuth()
            userEmail = email
        } else {
            if (!email) return { error: "Email is required" }
            userEmail = email
        }

        await db()
        const user = await User.findOne({ email: userEmail }).select("+password")

        if (!user.allowChangePassword) return { error: "You must verify your email before applying this change" }

        if (type === "change_password") {
            const isValid = await user.comparePassword(oldPassword)
            if (!isValid) return { error: "Incorrect password" }
        }

        user.password = password
        user.allowChangePassword = false
        await user.save()

        return { success: true, message: "Password has been changed" }
    } catch (error) {
        console.error(error)
        return { error: "Something went wrong while changing password" }
    }
}