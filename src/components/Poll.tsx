
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface PollOption {
  id: string;
  text: string;
}

interface PollProps {
  className?: string;
  question?: string;
  options?: PollOption[];
}

const Poll = ({ 
  className,
  question = "Will this episode break the internet again?", 
  options = [
    { id: "yes", text: "Yes, absolutely!" },
    { id: "no", text: "No, I don't think so" }
  ]
}: PollProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [results, setResults] = useState<Record<string, number>>({
    "yes": 68,
    "no": 32
  });

  const handleVote = () => {
    if (!selectedOption || hasVoted) return;
    
    // In a real app, you would send this to your backend
    // For demo purposes, we'll just update local state
    setResults(prev => ({
      ...prev,
      [selectedOption]: prev[selectedOption] + 1
    }));
    
    setHasVoted(true);
  };

  const calculatePercentage = (optionId: string) => {
    const total = Object.values(results).reduce((sum, count) => sum + count, 0);
    return Math.round((results[optionId] / total) * 100);
  };

  return (
    <div className={cn("section py-24", className)}>
      <div className="w-full max-w-2xl mx-auto fade-in-view">
        <div className="glass rounded-xl p-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-8 text-center text-white">
            {question}
          </h2>
          
          <div className="space-y-4">
            {options.map((option) => (
              <div key={option.id} className="relative">
                <button
                  className={cn(
                    "w-full text-left p-4 rounded-lg border transition-all duration-300 flex items-center",
                    hasVoted 
                      ? "cursor-default" 
                      : "hover:bg-white/5 hover:border-white/30",
                    selectedOption === option.id && !hasVoted
                      ? "border-white/50 bg-white/5"
                      : "border-white/10 bg-white/0"
                  )}
                  onClick={() => !hasVoted && setSelectedOption(option.id)}
                  disabled={hasVoted}
                >
                  {!hasVoted && (
                    <div className={cn(
                      "w-5 h-5 rounded-full border border-white/50 mr-3 flex-shrink-0",
                      selectedOption === option.id ? "bg-white" : "bg-transparent"
                    )}></div>
                  )}
                  <span className="text-white">{option.text}</span>
                  
                  {hasVoted && (
                    <span className="ml-auto font-bold text-white">
                      {calculatePercentage(option.id)}%
                    </span>
                  )}
                </button>
                
                {hasVoted && (
                  <div className="absolute left-0 bottom-0 h-1 bg-white/30 rounded-full" style={{
                    width: `${calculatePercentage(option.id)}%`,
                    transition: "width 1s ease-out"
                  }}></div>
                )}
              </div>
            ))}
          </div>
          
          {!hasVoted && (
            <button
              className={cn(
                "mt-8 w-full py-3 rounded-lg font-medium transition-all duration-300",
                selectedOption
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-white/10 text-white/50 cursor-not-allowed"
              )}
              onClick={handleVote}
              disabled={!selectedOption}
            >
              Submit Vote
            </button>
          )}
          
          {hasVoted && (
            <div className="mt-6 text-center text-sm text-gray-400">
              Thank you for your vote!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Poll;
