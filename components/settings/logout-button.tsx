"use client"

import { signOut } from "next-auth/react"
import { ReactNode } from "react"

export default function LogoutButton({ children }: { children: ReactNode }) {
    return (
        <button
            className="flex w-full cursor-pointer items-center justify-between border-b"
            onClick={() => signOut()}
        >
            {children}
        </button>
    )
}