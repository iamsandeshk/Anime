
import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  className?: string;
  title?: string;
}

const CountdownTimer = ({ 
  className,
  title = "Next Episode Countdown" 
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [flipStates, setFlipStates] = useState({
    days: false,
    hours: false,
    minutes: false,
    seconds: false
  });

  // Calculate time until next Saturday at 10 PM
  const getTimeUntilNextSaturday = useCallback(() => {
    const now = new Date();
    let nextSaturday = new Date(now);
    
    // Find next Saturday (day 6)
    nextSaturday.setDate(now.getDate() + (6 - now.getDay() + 7) % 7);
    
    // Set time to 10 PM
    nextSaturday.setHours(22, 0, 0, 0);
    
    // If today is Saturday and it's past 10 PM, get next Saturday
    if (now.getDay() === 6 && now.getHours() >= 22) {
      nextSaturday.setDate(nextSaturday.getDate() + 7);
    }
    
    return nextSaturday.getTime() - now.getTime();
  }, []);

  // Calculate and format time remaining
  const calculateTimeLeft = useCallback(() => {
    const timeRemaining = getTimeUntilNextSaturday();
    
    if (timeRemaining <= 0) {
      // Reset for next week when countdown ends
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }
    
    // Calculate time units
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
  }, [getTimeUntilNextSaturday]);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      
      // Create animation flip effect when digits change
      setFlipStates(prevState => ({
        days: prevState.days !== newTimeLeft.days,
        hours: prevState.hours !== newTimeLeft.hours,
        minutes: prevState.minutes !== newTimeLeft.minutes,
        seconds: true // Always flip seconds
      }));
      
      setTimeLeft(newTimeLeft);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  // Format numbers to always have two digits
  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : num.toString();
  };

  return (
    <div className={cn("section py-24", className)}>
      <div className="w-full max-w-4xl mx-auto text-center fade-in-view">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-12 text-white">
          {title}
        </h2>
        
        <div className="glass rounded-xl p-8 sm:p-10 md:p-12">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
            <div className="flex flex-col items-center">
              <div className={cn("timer-digit text-4xl sm:text-5xl md:text-6xl font-bold text-white", 
                flipStates.days ? "flip" : "")}>
                <span>{formatNumber(timeLeft.days)}</span>
              </div>
              <span className="text-xs sm:text-sm text-gray-300 mt-2">DAYS</span>
            </div>
            
            <div className="text-2xl sm:text-3xl md:text-4xl font-light text-white/50 self-start mt-2">:</div>
            
            <div className="flex flex-col items-center">
              <div className={cn("timer-digit text-4xl sm:text-5xl md:text-6xl font-bold text-white", 
                flipStates.hours ? "flip" : "")}>
                <span>{formatNumber(timeLeft.hours)}</span>
              </div>
              <span className="text-xs sm:text-sm text-gray-300 mt-2">HOURS</span>
            </div>
            
            <div className="text-2xl sm:text-3xl md:text-4xl font-light text-white/50 self-start mt-2">:</div>
            
            <div className="flex flex-col items-center">
              <div className={cn("timer-digit text-4xl sm:text-5xl md:text-6xl font-bold text-white", 
                flipStates.minutes ? "flip" : "")}>
                <span>{formatNumber(timeLeft.minutes)}</span>
              </div>
              <span className="text-xs sm:text-sm text-gray-300 mt-2">MINUTES</span>
            </div>
            
            <div className="text-2xl sm:text-3xl md:text-4xl font-light text-white/50 self-start mt-2">:</div>
            
            <div className="flex flex-col items-center">
              <div className={cn("timer-digit text-4xl sm:text-5xl md:text-6xl font-bold text-white", 
                flipStates.seconds ? "flip" : "")}>
                <span>{formatNumber(timeLeft.seconds)}</span>
              </div>
              <span className="text-xs sm:text-sm text-gray-300 mt-2">SECONDS</span>
            </div>
          </div>
          
          <p className="text-gray-400 mt-10 max-w-2xl mx-auto">
            The next episode will be released this Saturday at 10:00 PM. 
            Don't miss it!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
