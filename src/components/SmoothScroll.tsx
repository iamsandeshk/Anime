
import React, { useEffect, useRef, ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollingContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Skip smooth scrolling on mobile devices
    if (isMobile) return;

    let current = 0;
    let target = 0;
    let ease = 0.1;
    let rafId: number;

    const setBodyHeight = () => {
      if (scrollingContainerRef.current) {
        document.body.style.height = `${scrollingContainerRef.current.getBoundingClientRect().height}px`;
      }
    };

    const smoothScroll = () => {
      target = window.scrollY;
      current = current + (target - current) * ease;

      if (scrollingContainerRef.current) {
        scrollingContainerRef.current.style.transform = `translate3d(0, ${-current}px, 0)`;
      }
      
      rafId = requestAnimationFrame(smoothScroll);
    };

    // Initialize
    setBodyHeight();
    window.addEventListener("resize", setBodyHeight);
    rafId = requestAnimationFrame(smoothScroll);

    // Track elements for reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-in-view").forEach(el => {
      observer.observe(el);
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", setBodyHeight);
      document.body.style.height = "";
      observer.disconnect();
    };
  }, [isMobile]);

  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <div ref={containerRef} className="smooth-scroll">
      <div ref={scrollingContainerRef} className="smooth-scroll-container">
        {children}
      </div>
    </div>
  );
};

export default SmoothScroll;
