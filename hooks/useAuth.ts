"use client";

import { useSession } from "next-auth/react";
import type { User } from "next-auth";

export default function useAuth() {
    const { data: session, status, update } = useSession();

    const user = session?.user ?? null;
    const isAuthenticated = status === "authenticated";
    const isLoading = status === "loading";

    const updateUser = async (changes: User) => {
        if (!session?.user) return;

        await update({
            user: {
                ...session.user,
                ...changes,
            },
        });
    };


    return {
        user,
        session,
        status,
        isAuthenticated,
        isLoading,

        // 🔄 Update session user
        update: updateUser,
    };
}
