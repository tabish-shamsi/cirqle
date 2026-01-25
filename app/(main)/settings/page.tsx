import LogoutButton from "@/components/settings/logout-button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { SETTINGS_LINKS } from "@/lib/placeholder-data";
import { ChevronRight } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Settings() {
  return (
    <Card className="mb-4">
      <CardContent>
        <CardTitle className="text-xl md:text-2xl lg:text-4xl font-bold">
          Settings
        </CardTitle>
        {Object.entries(SETTINGS_LINKS).map(([tab, links]) => (
          <div key={tab} className="mt-12">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              {tab}
            </h4>

            {links.map((item) => {
              if (item.href === "LOGOUT") {
                return (
                  <LogoutButton key={item.label}>
                    <SettingsItem {...item} />
                  </LogoutButton>
                );
              } else {
                return (
                  <Link
                    key={item.label}
                    href={`/settings${item.href}`}
                    className="flex items-center justify-between border-b"
                  >
                    <SettingsItem {...item} />
                  </Link>
                );
              }
            })}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function SettingsItem({ icon, label }: { icon: any; label: string }) {
  const Icon = icon;
  return (
    <>
      <div className="flex items-center gap-4 py-2">
        <span className="h-8 md:h-10 w-8 md:w-10 flex items-center justify-center border-2 border-primary text-primary rounded-full">
          <Icon className="w-4 md:w-5" />
        </span>
        <span className="text-sm md:text-base font-semibold">{label}</span>
      </div>

      <ChevronRight className="text-sidebar-ring" />
    </>
  );
}
