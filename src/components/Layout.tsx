
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import SmoothScroll from "./SmoothScroll";

interface LayoutProps {
  children: ReactNode;
  className?: string;
  useSmoothScroll?: boolean;
}

const Layout = ({ children, className, useSmoothScroll = true }: LayoutProps) => {
  return (
    <div 
      className={cn(
        "min-h-screen w-full bg-black text-white overflow-hidden",
        className
      )}
    >
      {useSmoothScroll ? (
        <SmoothScroll>
          <main className="relative">
            {children}
          </main>
        </SmoothScroll>
      ) : (
        <main className="relative">
          {children}
        </main>
      )}
    </div>
  );
};

export default Layout;
