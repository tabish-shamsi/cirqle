"use server"

import checkAuth from "@/data/check-auth";
import Profile from "@/models/Profile";
import User from "@/models/User";
import { TAccountInfoSchema } from "@/schemas/account-information";

export default async function updateAccountInfo(accountInfo: TAccountInfoSchema) {
    const { firstName, lastName, username, birthday, bio, hometown, current_city, profession } = accountInfo
    try {
        const { id } = await checkAuth()

        const name = `${firstName} ${lastName}`
        const user = await User.findById(id)
        if (!user) return { error: "User not found" }

        const profile = await Profile.findOne({ userId: id })

        if (!profile) {
            await Profile.create({ userId: id, bio, hometown, current_city, profession })
        } else {
            profile.bio = bio;
            profile.hometown = hometown;
            profile.current_city = current_city;
            profile.profession = profession;
        }

        user.name = name
        user.username = username
        user.birthday = birthday

        await user.save()
        await profile.save()

        return { success: true, message: "Account information has been updated" }

    } catch (error) {
        console.error(error)
        return { error: "Something went wrong while updating account information" }
    }
}