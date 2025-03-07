
import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div 
      className={cn(
        "logo-container fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-[280px] sm:max-w-xs",
        className
      )}
    >
      <div className="bg-black/90 backdrop-blur-md px-4 sm:px-5 py-2 sm:py-3 rounded-full shadow-xl border border-white/20">
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          <span className="font-light">Solo</span>Leveling
        </h1>
      </div>
    </div>
  );
};

export default Logo;
