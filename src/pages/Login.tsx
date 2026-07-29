
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { getEventSettings } from "@/utils/eventSettings";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const settings = getEventSettings();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      if (success) {
        navigate('/dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-md py-12 px-4">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6">
            Connexion Organisateur
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Nom d'utilisateur
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Connexion en cours...' : 'Se connecter'}
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              Pour accéder au tableau de bord de l'organisateur et aux fonctionnalités 
              avancées de gestion d'événements ({settings.appName}).
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
