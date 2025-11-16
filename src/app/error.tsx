"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-rose-100 p-3">
            <AlertCircle className="size-10 text-rose-600" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Something went wrong</h2>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
        <div className="flex justify-center gap-3">
          <Button onClick={reset} className="px-6 font-medium">
            <span>Try again</span>
          </Button>
          <Button asChild variant={"ghost"} className="px-6 font-medium">
            <Link href="/">Go back</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
