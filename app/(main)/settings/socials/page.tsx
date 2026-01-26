import Socials from "@/components/settings/socials";
import SocialsFormSekeleton from "@/components/skeletons/socials-form-sekeleton";
import { Suspense } from "react";

export default function AccountInformation() {
  return (
    <Suspense fallback={<SocialsFormSekeleton />}>
      <Socials />
    </Suspense>
  )
}
