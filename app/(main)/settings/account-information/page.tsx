import AccountInfoSkeleton from "@/components/skeletons/account-info-skeleton";
import AccountInformation from "@/components/settings/account-information"
import { Suspense } from "react";

export default function AccountInformationPage() {
  return <Suspense fallback={<AccountInfoSkeleton />}><AccountInformation /></Suspense>
}
