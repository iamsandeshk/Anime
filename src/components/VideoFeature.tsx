
import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface VideoFeatureProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

const VideoFeature = ({ className, title = "Solo Leveling", subtitle = "Arise from the Shadow" }: VideoFeatureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
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

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div 
      className={cn(
        "relative min-h-[60vh] sm:min-h-[80vh] w-full overflow-hidden",
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
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
        <h2 className="text-white text-lg sm:text-xl md:text-2xl font-light tracking-wider uppercase">
          {title}
        </h2>
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6 text-white tracking-tight text-shadow-lg">
          {subtitle}
        </h1>
      </div>
    </div>
  );
};

export default VideoFeature;
