import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/shared/lib/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      isLoading = false,
      className = "",
      disabled,
      onDrag: _onDrag,
      onDragStart: _onDragStart,
      onDragEnd: _onDragEnd,
      onAnimationStart: _onAnimationStart,
      ...props
    },
    ref,
  ) => {
    const base =
      "font-sans font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl";

    const variants = {
      primary:
        "bg-[#3DC6E7] text-[#001520] shadow-[0_4px_20px_rgba(61,198,231,0.4)] hover:bg-[#5DD4EF] hover:shadow-[0_8px_32px_rgba(61,198,231,0.6)]",
      secondary:
        "bg-transparent text-[#3DC6E7] border-2 border-[#3DC6E7]/40 hover:bg-[#3DC6E7] hover:text-[#001520] hover:border-[#3DC6E7] hover:shadow-[0_4px_20px_rgba(61,198,231,0.4)]",
      ghost:
        "bg-transparent text-[#3DC6E7] hover:bg-[#3DC6E7]/10 hover:text-[#5DD4EF]",
    };

    const sizes = {
      sm: "text-label-md px-4 py-2",
      md: "text-body-md px-6 py-3",
      lg: "text-body-lg px-8 py-4",
    };

    return (
      <motion.button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        whileHover={!disabled && !isLoading ? { scale: 1.02 } : {}}
        whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          children
        )}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
