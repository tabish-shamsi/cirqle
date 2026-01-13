import { Card, CardContent } from "../ui/card";

export default function SettingsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full md:w-3/4">
        <Card className="my-14">
          <CardContent className="relative">{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
