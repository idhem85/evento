import React, { useEffect, useState } from "react";
import { getEventSettings } from "@/utils/eventSettings";
import { Clock } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TimeUnit: React.FC<{ value: number; label: string; delay: number }> = ({ value, label, delay }) => (
  <div 
    className="flex flex-col items-center animate-fade-in" 
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[100px] shadow-xl">
      <span className="block text-3xl md:text-5xl lg:text-6xl font-bold text-white tabular-nums">
        {value.toString().padStart(2, "0")}
      </span>
    </div>
    <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-white/70 mt-2">
      {label}
    </span>
  </div>
);

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });
  const [settings, setSettings] = useState(getEventSettings());
  const [isVisible, setIsVisible] = useState(true);

  const calculateTimeLeft = (): TimeLeft => {
    const eventDateParts = settings.eventDate?.split(" ")[0]?.split("/") || [];
    let eventDate: Date;
    
    if (eventDateParts.length === 3) {
      eventDate = new Date(`${eventDateParts[2]}-${eventDateParts[1]}-${eventDateParts[0]}T00:00:00`);
    } else {
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
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    const initialSettings = getEventSettings();
    if (initialSettings.countdownVisible !== undefined) {
      setIsVisible(initialSettings.countdownVisible);
    }

    const handleStorageChange = () => {
      const updatedSettings = getEventSettings();
      setSettings(updatedSettings);
      if (updatedSettings.countdownVisible !== undefined) {
        setIsVisible(updatedSettings.countdownVisible);
      }
    };

    window.addEventListener('storage', handleStorageChange);

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

  if (isVisible === false || !settings.eventDate) return null;

  const backgroundColor = settings.countdownBackgroundColor || "hsl(262 83% 58%)";

  return (
    <div className="relative py-12 md:py-16 overflow-hidden" style={{ backgroundColor }}>
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
      <div className="absolute top-0 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-4 sm:px-6">
        <div className="text-center">
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6 animate-fade-in">
            <Clock className="h-4 w-4 text-white/80" />
            <span className="text-sm font-medium text-white/80">L'événement commence dans</span>
          </div>

          {/* Countdown Units */}
          <div className="flex justify-center gap-3 md:gap-5">
            <TimeUnit value={timeLeft.days} label="Jours" delay={0} />
            <span className="text-3xl md:text-5xl font-bold text-white/40 self-start mt-3 md:mt-4 hidden sm:block">:</span>
            <TimeUnit value={timeLeft.hours} label="Heures" delay={150} />
            <span className="text-3xl md:text-5xl font-bold text-white/40 self-start mt-3 md:mt-4 hidden sm:block">:</span>
            <TimeUnit value={timeLeft.minutes} label="Minutes" delay={300} />
            <span className="text-3xl md:text-5xl font-bold text-white/40 self-start mt-3 md:mt-4 hidden sm:block">:</span>
            <TimeUnit value={timeLeft.seconds} label="Secondes" delay={450} />
          </div>
        </div>
      </div>
    </div>
  );
};
