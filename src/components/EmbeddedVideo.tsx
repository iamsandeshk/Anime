
import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface EmbeddedVideoProps {
  videoId?: string;
  className?: string;
  title?: string;
}

const EmbeddedVideo = ({ 
  videoId = "d9MyW72ELq0", // Default: A random YouTube video
  className,
  title = "Featured Video" 
}: EmbeddedVideoProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // For Drive videos, the format would be different
  // This is a YouTube embed for demonstration
  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=0&modestbranding=1&rel=0`;

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={cn("section px-4 py-24", className)} ref={containerRef}>
      <div className="section-content w-full max-w-5xl mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-8 text-white">
          {title}
        </h2>
        
        <div className="video-container aspect-video">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
              <div className="space-x-1 text-white">
                <span className="loading-dot"></span>
                <span className="loading-dot"></span>
                <span className="loading-dot"></span>
              </div>
            </div>
          )}
          
          <iframe
            src={videoSrc}
            title="Video player"
            className={cn(
              "absolute top-0 left-0 w-full h-full border-0 rounded-lg shadow-xl transition-opacity duration-500",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={handleIframeLoad}
          ></iframe>
        </div>
        
        <p className="text-sm text-center text-gray-400 mt-4">
          This video can be updated from the admin page
        </p>
      </div>
    </div>
  );
};

export default EmbeddedVideo;
