
import React, { useEffect, useState } from "react";
import { getEventSettings } from "@/utils/eventSettings";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [settings, setSettings] = useState(getEventSettings());
  const [isVisible, setIsVisible] = useState(true);

  // Get event date from settings or use a default
  const calculateTimeLeft = () => {
    // Parse the event date string to get the date
    const eventDateParts = settings.eventDate?.split(" ")[0]?.split("/") || [];
    
    let eventDate: Date;
    
    if (eventDateParts.length === 3) {
      // Convert DD/MM/YYYY to a Date object
      eventDate = new Date(`${eventDateParts[2]}-${eventDateParts[1]}-${eventDateParts[0]}T00:00:00`);
    } else {
      // Default to a future date if eventDate parsing fails
      eventDate = new Date();
      eventDate.setFullYear(eventDate.getFullYear() + 1);
    }

    const difference = +eventDate - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Set up event listener for localStorage changes
    const handleStorageChange = () => {
      const updatedSettings = getEventSettings();
      setSettings(updatedSettings);
      
      // Check if countdown should be visible
      if (updatedSettings.countdownVisible !== undefined) {
        setIsVisible(updatedSettings.countdownVisible);
      }
    };
    
    // Initial check for visibility
    const initialSettings = getEventSettings();
    if (initialSettings.countdownVisible !== undefined) {
      setIsVisible(initialSettings.countdownVisible);
    }
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically for changes in the same tab
    const settingsCheck = setInterval(() => {
      const currentSettings = getEventSettings();
      if (JSON.stringify(currentSettings) !== JSON.stringify(settings)) {
        setSettings(currentSettings);
        
        if (currentSettings.countdownVisible !== undefined) {
          setIsVisible(currentSettings.countdownVisible);
        }
      }
    }, 2000);

    return () => {
      clearInterval(timer);
      clearInterval(settingsCheck);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const padWithZero = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  // Apply the countdown colors from settings
  const backgroundColor = settings.countdownBackgroundColor || settings.secondaryColor || "#F7DE45";
  const textColor = settings.countdownTextColor || settings.primaryColor || "#12644F";

  // If countdown is set to be hidden, return null
  if (isVisible === false) {
    return null;
  }

  return (
    <div className="py-8 w-full" style={{ backgroundColor }}>
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center">
              <span className="text-5xl md:text-7xl font-bold" style={{ color: textColor }}>{timeLeft.days}</span>
              <span className="uppercase font-bold" style={{ color: textColor }}>Days</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl md:text-7xl font-bold" style={{ color: textColor }}>{padWithZero(timeLeft.hours)}</span>
              <span className="uppercase font-bold" style={{ color: textColor }}>Hours</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl md:text-7xl font-bold" style={{ color: textColor }}>{padWithZero(timeLeft.minutes)}</span>
              <span className="uppercase font-bold" style={{ color: textColor }}>Minutes</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl md:text-7xl font-bold" style={{ color: textColor }}>{padWithZero(timeLeft.seconds)}</span>
              <span className="uppercase font-bold" style={{ color: textColor }}>Seconds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
