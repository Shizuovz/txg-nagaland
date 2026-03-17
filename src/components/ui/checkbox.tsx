import * as React from "react";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      className={cn(
        "h-4 w-4 rounded border-2 border-gray-400 bg-black text-black focus:ring-2 focus:ring-green-400 focus:ring-offset-2 cursor-pointer transition-all duration-200",
        // Custom checkbox styling
        "appearance-none checked:bg-green-400 checked:border-green-400",
        "checked:bg-[url('data:image/svg+xml,%3csvg viewBox=\"0 0 16 16\" fill=\"black\" xmlns=\"http://www.w3.org/2000/svg\"%3e%3cpath d=\"m13.854 3.646-7.5 7.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6 10.293l7.146-7.147a.5.5 0 0 1 .708.708z\"/%3e%3c/svg%3e')]",
        "checked:bg-no-repeat checked:bg-center checked:bg-[length:12px_12px]",
        "hover:border-green-400",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };
