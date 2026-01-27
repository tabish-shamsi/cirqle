import SettingsCardHeader from "@/components/settings/settings-card-header";
import SettingsWrapper from "@/components/settings/settings-wrapper";
import SocialsForm from "./socials-form";
import { getSocialsObject } from "@/data/user";

export default async function Socials() {
    const socials = await getSocialsObject()

    return (
        <SettingsWrapper>
            <SettingsCardHeader title="Social Networks" />

            <SocialsForm socials={socials} />
        </SettingsWrapper>
    )
}