
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [heroTitle, setHeroTitle] = useState("Solo Leveling");
  const [heroSubtitle, setHeroSubtitle] = useState("Arise from the Shadow");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Simple authentication for demo purposes
  // In a real app, you would use a proper authentication system
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (password === "admin123") { // Simple hardcoded password for demo
        setAuthenticated(true);
        toast({
          title: "Authentication successful",
          description: "Welcome to the admin panel",
        });
      } else {
        toast({
          title: "Authentication failed",
          description: "Invalid password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleUpdateVideo = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call to update video
    setTimeout(() => {
      toast({
        title: "Video updated",
        description: "The video has been updated successfully",
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleUpdateHero = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call to update hero content
    setTimeout(() => {
      toast({
        title: "Hero content updated",
        description: "The title and subtitle have been updated successfully",
      });
      setIsLoading(false);
    }, 1000);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-xl shadow-2xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Admin Access</h1>
            <p className="mt-2 text-gray-400">Enter your password to continue</p>
          </div>
          
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Authenticating..." : "Sign In"}
              </button>
            </div>
          </form>
          
          <div className="text-center mt-4">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-gray-400 hover:text-white"
            >
              Return to site
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            View Site
          </button>
        </div>
        
        {/* Hero Content Section */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-xl mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Update Hero Content</h2>
          
          <form onSubmit={handleUpdateHero} className="space-y-4">
            <div>
              <label htmlFor="hero-title" className="block text-sm font-medium text-gray-400">
                Title
              </label>
              <input
                id="hero-title"
                type="text"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter title"
              />
            </div>
            
            <div>
              <label htmlFor="hero-subtitle" className="block text-sm font-medium text-gray-400">
                Subtitle
              </label>
              <input
                id="hero-subtitle"
                type="text"
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter subtitle"
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Updating..." : "Update Hero Content"}
              </button>
            </div>
          </form>
        </div>
        
        {/* Video Section */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-white mb-4">Update Featured Video</h2>
          
          <form onSubmit={handleUpdateVideo} className="space-y-4">
            <div>
              <label htmlFor="video-url" className="block text-sm font-medium text-gray-400">
                Video URL or ID
              </label>
              <input
                id="video-url"
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter YouTube ID or Google Drive URL"
              />
              <p className="mt-1 text-xs text-gray-500">
                For YouTube videos, enter the video ID (e.g., d9MyW72ELq0). 
                For Google Drive, enter the complete share URL.
              </p>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading || !videoUrl}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Updating..." : "Update Video"}
              </button>
            </div>
          </form>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 mt-6 shadow-xl">
          <h2 className="text-xl font-semibold text-white mb-4">Admin Actions</h2>
          
          <div className="space-y-4">
            <button
              onClick={() => {
                setAuthenticated(false);
                setPassword("");
                toast({
                  title: "Logged out",
                  description: "You have been logged out successfully",
                });
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
