import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function LogoutButton() {
    return (
        <Button type="button" onClick={() => signOut()}>Logout</Button>
    )
}