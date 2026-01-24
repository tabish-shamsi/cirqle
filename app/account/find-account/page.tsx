import AccountRecoveryCard from "@/components/auth/account-card";
import FindMyAccountForm from "@/components/auth/forget-password-form";
import { findAccount } from "@/data/user";

export default async function FindAccount({ searchParams }: { searchParams: Promise<{ identifier: string }> }) {
    const { identifier } = await searchParams
    const user = await findAccount(identifier)

    return (
        <>
            <h1 className="text-4xl font-bold leading-tight">
                Find <br /> your Account
            </h1>

            {/* FORM */}
            <FindMyAccountForm />
            {!user ? <p className="text-muted-foreground">We couldn’t find an account associated with that email or username.</p> : (<AccountRecoveryCard {...user} />)}
        </>
    )
}