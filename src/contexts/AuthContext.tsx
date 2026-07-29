
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Check if user is already authenticated (from localStorage)
  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('auth');
      setIsAuthenticated(auth === 'true');
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // In a real application, this would make a request to an authentication API
      // For demo purposes, we'll accept any non-empty values
      if (username.trim() && password.trim()) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Set authentication state
        setIsAuthenticated(true);
        localStorage.setItem('auth', 'true');
        
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans le tableau de bord d'organisateur.",
        });
        
        return true;
      } else {
        toast({
          title: "Erreur de connexion",
          description: "Veuillez entrer un nom d'utilisateur et un mot de passe valides.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Erreur de connexion",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('auth');
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
