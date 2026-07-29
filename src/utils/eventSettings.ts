
// Simple utility to manage event settings in localStorage

export interface EventSettings {
  appName: string;
  logoUrl: string | null;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  eventDescription: string;
  menuItems: string[];
  primaryColor: string;
  secondaryColor: string;
  bannerUrl: string | null;
  countdownVisible?: boolean;
  countdownBackgroundColor?: string;
  countdownTextColor?: string;
  countdownStyle?: string;
}

const DEFAULT_SETTINGS: EventSettings = {
  appName: "Event Manager",
  logoUrl: null,
  eventName: "Tech Conference 2023",
  eventDate: "December 15-17, 2023",
  eventLocation: "Convention Center, Paris",
  eventDescription: "Join us for three days of inspiring talks, workshops, and networking opportunities with industry leaders.",
  menuItems: ["Accueil", "A propos", "Inscription", "Contacts"],
  primaryColor: "#9b87f5",
  secondaryColor: "#6E59A5",
  bannerUrl: null,
  countdownVisible: true,
  countdownBackgroundColor: "#F7DE45",
  countdownTextColor: "#12644F",
  countdownStyle: "default"
};

export const getEventSettings = (): EventSettings => {
  try {
    const storedSettings = localStorage.getItem('eventSettings');
    if (storedSettings) {
      return JSON.parse(storedSettings);
    }
    return DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Error loading event settings:', error);
    return DEFAULT_SETTINGS;
  }
};

export const saveEventSettings = (settings: EventSettings): void => {
  try {
    localStorage.setItem('eventSettings', JSON.stringify(settings));
    
    // Also update CSS variables
    document.documentElement.style.setProperty('--primary-color', settings.primaryColor || '#9b87f5');
    document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor || '#6E59A5');
    
    // Dispatch storage event to notify other components
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error('Error saving event settings:', error);
  }
};
