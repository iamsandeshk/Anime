
import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface VideoFeatureProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

const VideoFeature = ({ className, title = "Solo Leveling", subtitle = "Arise from the Shadow" }: VideoFeatureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.play().catch(err => console.error("Video play error:", err));
          } else if (videoRef.current) {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative h-screen w-full overflow-hidden fade-in-view",
        className
      )}
    >
      {/* Loading state */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="space-x-1">
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
          </div>
        </div>
      )}
      
      {/* Video background */}
      <video
        ref={videoRef}
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
          isVideoLoaded ? "opacity-100" : "opacity-0"
        )}
        loop
        muted
        playsInline
        onLoadedData={handleVideoLoaded}
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-high-tech-digital-animation-of-a-robotic-sphere-12722-large.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-white text-xl md:text-2xl font-light tracking-wider uppercase animate-slide-down">{title}</h2>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mt-4 mb-6 text-white tracking-tight text-shadow-lg animate-slide-up">
          {subtitle}
        </h1>
      </div>
    </div>
  );
};

export default VideoFeature;
