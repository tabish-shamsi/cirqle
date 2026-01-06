"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type AccountRecoveryCardProps = {
  name: string;
  email: string; // email or username
  avatarUrl?: string;
};

export default function AccountRecoveryCard({
  name,
  email,
  avatarUrl,
}: AccountRecoveryCardProps) {
  return (
    <Card className="max-w-md mx-auto shadow-sm">
      <CardHeader className="text-center space-y-4">
        <Avatar className="mx-auto h-20 w-20">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground text-center">
          This account looks like yours.
        </p>

        <Button className="w-full">Continue</Button>
      </CardContent>
    </Card>
  );
}
