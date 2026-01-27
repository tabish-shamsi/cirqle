import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Linkedin,
    Globe
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSocials } from "@/data/user";

const iconMap: Record<string, any> = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    youtube: Youtube,
    linkedin: Linkedin,
};

export async function SocialsCard({ userId }: { userId: string }) {
    const socials = await getSocials(userId)

    return (
        <Card>
            <CardContent>
                <h3 className="text-lg font-semibold mb-4">
                    Social Networks
                </h3>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-6">
                    {socials.map(({ platform, url }) => {
                        const Icon =
                            iconMap[platform.toLowerCase()] || Globe;

                        return (
                            <Button
                                key={platform}
                                variant="outline"
                                asChild
                            >
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={platform}
                                >
                                    <Icon className="h-5 w-5" />
                                    {platform}
                                </a>
                            </Button>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
