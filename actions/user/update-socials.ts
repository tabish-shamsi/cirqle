"use server"

import checkAuth from "@/data/check-auth";
import db from "@/lib/db";
import Profile from "@/models/Profile";
import { TSocialNetworks } from "@/schemas/social-networks";

export default async function updateSocials(socials: TSocialNetworks) {
    try {
        const { id } = await checkAuth()

        await db()

        const profile = await Profile.findOne({ userId: id })

        const socialsArr = Object.entries(socials).map(([key, value]) => {
            return {
                platform: key.charAt(0).toUpperCase() + key.slice(1),
                url: value
            }
        })

        if (!profile) {
            await Profile.create({
                userId: id,
                socials: socialsArr
            })
        } else {
            profile.socials = socialsArr
            await profile.save()
        }

        return { success: true, message: "Social networks updated" }
    } catch (error) {
        console.error(error)
        return { error: "Something went wrong while updating social networks" }
    }
}