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

  const getTimeUntilNextSaturday = useCallback(() => {
    const now = new Date();
    let nextSaturday = new Date(now);
    
    nextSaturday.setDate(now.getDate() + (6 - now.getDay() + 7) % 7);
    nextSaturday.setHours(22, 0, 0, 0);
    
    if (now.getDay() === 6 && now.getHours() >= 22) {
      nextSaturday.setDate(nextSaturday.getDate() + 7);
    }
    
    return nextSaturday.getTime() - now.getTime();
  }, []);

  const calculateTimeLeft = useCallback(() => {
    const timeRemaining = getTimeUntilNextSaturday();
    
    if (timeRemaining <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }
    
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
  }, [getTimeUntilNextSaturday]);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      
      setFlipStates(prevState => ({
        days: timeLeft.days !== newTimeLeft.days,
        hours: timeLeft.hours !== newTimeLeft.hours,
        minutes: timeLeft.minutes !== newTimeLeft.minutes,
        seconds: true
      }));
      
      setTimeLeft(newTimeLeft);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [calculateTimeLeft, timeLeft]);

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : num.toString();
  };

  return (
    <div className={cn("section py-16 sm:py-24", className)}>
      <div className="section-content w-full max-w-4xl mx-auto text-center px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-8 sm:mb-12 text-white">
          {title}
        </h2>
        
        <div className="glass rounded-xl p-6 sm:p-8 md:p-10 lg:p-12">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            <div className="flex flex-col items-center">
              <div className={cn("timer-digit text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white", 
                flipStates.days ? "flip" : "")}>
                <span>{formatNumber(timeLeft.days)}</span>
              </div>
              <span className="text-xs sm:text-sm text-gray-300 mt-2">DAYS</span>
            </div>
            
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white/50 self-start mt-2">:</div>
            
            <div className="flex flex-col items-center">
              <div className={cn("timer-digit text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white", 
                flipStates.hours ? "flip" : "")}>
                <span>{formatNumber(timeLeft.hours)}</span>
              </div>
              <span className="text-xs sm:text-sm text-gray-300 mt-2">HOURS</span>
            </div>
            
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white/50 self-start mt-2">:</div>
            
            <div className="flex flex-col items-center">
              <div className={cn("timer-digit text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white", 
                flipStates.minutes ? "flip" : "")}>
                <span>{formatNumber(timeLeft.minutes)}</span>
              </div>
              <span className="text-xs sm:text-sm text-gray-300 mt-2">MINUTES</span>
            </div>
            
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white/50 self-start mt-2">:</div>
            
            <div className="flex flex-col items-center">
              <div className={cn("timer-digit text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white", 
                flipStates.seconds ? "flip" : "")}>
                <span>{formatNumber(timeLeft.seconds)}</span>
              </div>
              <span className="text-xs sm:text-sm text-gray-300 mt-2">SECONDS</span>
            </div>
          </div>
          
          <p className="text-gray-300 mt-8 sm:mt-10 max-w-2xl mx-auto text-sm sm:text-base">
            The next episode will be released this Saturday at 10:00 PM. 
            Don't miss it!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
