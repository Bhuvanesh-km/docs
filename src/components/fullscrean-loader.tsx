import { LoaderIcon } from "lucide-react";

interface fullscreenLoaderProps {
  label?: string;
  className?: string;
}

export const FullscreenLoader = ({
  label = "Loading...",
}: fullscreenLoaderProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
      <LoaderIcon className="animate-spin" />
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  );
};
