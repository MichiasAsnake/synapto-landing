import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl border border-zinc-800/70 bg-zinc-900/70 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.45)] backdrop-blur",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export { Card };

