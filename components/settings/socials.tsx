import SettingsCardHeader from "@/components/settings/settings-card-header";
import SettingsWrapper from "@/components/settings/settings-wrapper";
import SocialsForm from "./socials-form";
import { getSocials } from "@/data/user";

export default async function Socials() {
    const socials = await getSocials()

    return (
        <SettingsWrapper>
            <SettingsCardHeader title="Social Networks" />

            <SocialsForm socials={socials} />
        </SettingsWrapper>
    )
}