type Props = {
  count: number;
  activeIndex: number;
  progress: number;
};

export default function StoryProgress({ count, activeIndex, progress }: Props) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-1 flex-1 rounded bg-white/30 overflow-hidden">
          <div
            className="h-full bg-white transition-all"
            style={{
              width:
                i < activeIndex
                  ? "100%"
                  : i === activeIndex
                  ? `${progress}%`
                  : "0%",
            }}
          />
        </div>
      ))}
    </div>
  );
}
