import AccountInfoForm from "./account-info-form";
import SettingsCardHeader from "@/components/settings/settings-card-header";
import SettingsWrapper from "@/components/settings/settings-wrapper";
import { getAccountInformation } from "@/data/user";


export default async function AccountInformation() {
    const accountInfo = await getAccountInformation()

    return (
        <SettingsWrapper>
            <SettingsCardHeader title="Account Information" />
            <AccountInfoForm accountInfo={accountInfo} />
        </SettingsWrapper>
    )
}