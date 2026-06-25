import { cn } from "@/lib/utils";
import { forwardRef, type ImgHTMLAttributes } from "react";

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: "sm" | "md" | "lg" | "xl";
  fallback?: string;
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-xl",
};

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, size = "md", fallback, alt = "", src, ...props }, ref) => {
    if (!src) {
      return (
        <div
          className={cn(
            "rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center font-semibold text-white flex-shrink-0",
            sizeClasses[size],
            className
          )}
        >
          {fallback?.charAt(0).toUpperCase() || "?"}
        </div>
      );
    }
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn(
          "rounded-full object-cover flex-shrink-0",
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);
Avatar.displayName = "Avatar";
