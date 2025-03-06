
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div 
      className={cn(
        "min-h-screen w-full bg-black text-white",
        className
      )}
    >
      <main className="relative">
        {children}
      </main>
    </div>
  );
};

export default Layout;
