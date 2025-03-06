
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!logoRef.current) return;
      
      const scrollY = window.scrollY;
      const scale = Math.max(0.8, 1 - scrollY / 800);
      const opacity = Math.max(0.5, 1 - scrollY / 1000);
      
      logoRef.current.style.transform = `scale(${scale})`;
      logoRef.current.style.opacity = `${opacity}`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      ref={logoRef}
      className={cn(
        "fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-transform duration-300 ease-out",
        className
      )}
    >
      <div className="bg-black/10 backdrop-blur-md px-5 py-3 rounded-full shadow-lg border border-white/10">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          <span className="font-light">Solo</span>Leveling
        </h1>
      </div>
    </div>
  );
};

export default Logo;
