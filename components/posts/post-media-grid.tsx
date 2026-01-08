import { cn } from "@/lib/utils";

type MediaItem =
  | { id: string; type: "image"; url: string }
  | { id: string; type: "video"; url: string };

export default function PostMediaGrid({ media }: { media: MediaItem[] }) {
  const visibleMedia = media.slice(0, 5);
  const extraCount = media.length - 5;

  return (
    <div
      className={cn(
        "grid gap-1 rounded-md overflow-hidden",
        media.length === 2 ? "h-62.5" : "h-90",
        media.length === 1 && "grid-cols-1",
        media.length === 2 && "grid-cols-2 h-62.5",
        media.length === 3 && "grid-cols-2 grid-rows-2",
        media.length >= 4 && "grid-cols-2 grid-rows-2",
      )}
    >
      {visibleMedia.map((item, index) => {
        const isLarge = media.length === 3 && index === 0;

        return (
          <div
            key={item.id}
            className={`
              relative bg-black

              ${isLarge && "row-span-2"}
            `}
          >
            {item.type === "image" && (
              <img
                src={item.url}
                alt="Post media"
                className="h-full w-full object-cover"
              />
            )}

            {item.type === "video" && (
              <video controls className="h-full w-full object-cover">
                <source src={item.url} type="video/mp4" />
              </video>
            )}

            {extraCount > 0 && index === 4 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-3xl font-semibold">
                +{extraCount}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
