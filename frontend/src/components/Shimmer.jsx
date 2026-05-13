import { cn } from "@/lib/utils";

export const Shimmer = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-slate-200",
        "before:absolute before:inset-0",
        "before:translate-x-full before:animate-shimmer",
        "before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent",
        className,
      )}
      {...props}
    />
  );
};

export const ShimmerCard = () => (
  <div className="space-y-4 p-4">
    <Shimmer className="h-64 w-full rounded-lg" />
    <div className="space-y-2">
      <Shimmer className="h-4 w-3/4" />
      <Shimmer className="h-4 w-1/2" />
    </div>
  </div>
);

export const ShimmerBanner = ({ height = "h-[520px]" }) => (
  <div className={cn("w-full bg-slate-200 rounded-md overflow-hidden", height)}>
    <div className="relative w-full h-full">
      <Shimmer className="absolute inset-0" />
    </div>
  </div>
);

export default Shimmer;
