
import React, { useEffect } from "react";
import { getEventSettings } from "@/utils/eventSettings";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Function to update CSS variables based on event settings
    const updateThemeVariables = () => {
      const settings = getEventSettings();
      
      // Update CSS variables
      document.documentElement.style.setProperty('--event-primary-color', settings.primaryColor);
      document.documentElement.style.setProperty('--event-secondary-color', settings.secondaryColor);
    };
    
    // Initial update
    updateThemeVariables();
    
    // Set up an event listener for storage changes (if other tabs update settings)
    const handleStorageChange = () => {
      updateThemeVariables();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  return <>{children}</>;
};
