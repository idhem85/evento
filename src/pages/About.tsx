
import React from "react";
import { Layout } from "@/components/Layout";
import { getEventSettings } from "@/utils/eventSettings";
import { 
  CalendarDays, 
  MapPin, 
  Users, 
  Target, 
  TrendingUp,
  Award,
  Building,
  UserCheck,
  BadgeCheck
} from "lucide-react";

const About = () => {
  const settings = getEventSettings();

  // Exemple de sponsors (dans une vraie application, ils viendraient du tableau de bord)
  const sponsors = [
    { id: 1, name: "TechCorp", logo: "https://via.placeholder.com/150x80?text=TechCorp" },
    { id: 2, name: "Innovate Labs", logo: "https://via.placeholder.com/150x80?text=InnovateLabs" },
    { id: 3, name: "Digital Solutions", logo: "https://via.placeholder.com/150x80?text=DigitalSolutions" },
    { id: 4, name: "Future Tech", logo: "https://via.placeholder.com/150x80?text=FutureTech" },
    { id: 5, name: "Smart Systems", logo: "https://via.placeholder.com/150x80?text=SmartSystems" },
    { id: 6, name: "Global Connect", logo: "https://via.placeholder.com/150x80?text=GlobalConnect" },
  ];

  // Statistiques des événements passés (dans une vraie application, elles viendraient du tableau de bord)
  const previousStats = [
    { label: "Visiteurs", value: "5,200+", icon: Users },
    { label: "Exposants", value: "120+", icon: Building },
    { label: "Sponsors", value: "45", icon: Award },
    { label: "Participants", value: "3,800+", icon: UserCheck },
  ];

  // Default banner if none is set
  const bannerUrl = settings.bannerUrl || "https://via.placeholder.com/1200x400?text=Event+Banner";

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        {/* Event Banner */}
        <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
          <img 
            src={bannerUrl} 
            alt={settings.eventName} 
            className="w-full h-[400px] object-cover"
          />
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 relative inline-block">
            {settings.menuItems[1] || "À propos"}
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400"></span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez tout ce que vous devez savoir sur notre événement
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 mb-16">
          <div className="prose lg:prose-xl mx-auto">
            <h2 className="flex items-center font-bold text-2xl mb-6">
              <Target className="mr-2 text-primary" />
              À propos de {settings.eventName}
            </h2>
            <p className="mb-6 text-gray-700">
              {settings.eventDescription}
            </p>
            
            <h3 className="flex items-center font-bold text-xl mb-4">
              <TrendingUp className="mr-2 text-primary" />
              Notre mission
            </h3>
            <p className="mb-6 text-gray-700">
              Notre mission est de créer un événement inoubliable qui favorise l'échange de connaissances, 
              encourage les connexions professionnelles et inspire l'innovation dans notre domaine.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg my-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start">
                  <CalendarDays className="mr-3 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Date</h4>
                    <p className="text-gray-700">{settings.eventDate}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="mr-3 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Lieu</h4>
                    <p className="text-gray-700">{settings.eventLocation}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <h3 className="flex items-center font-bold text-xl mb-4">
              <Users className="mr-2 text-primary" />
              À qui s'adresse cet événement ?
            </h3>
            <p className="mb-6 text-gray-700">
              Cet événement s'adresse aux professionnels, chercheurs, étudiants et passionnés 
              qui souhaitent enrichir leurs connaissances, partager leurs expériences et 
              développer leur réseau professionnel.
            </p>
            
            <h3 className="flex items-center font-bold text-xl mb-4">
              <BadgeCheck className="mr-2 text-primary" />
              Comment participer ?
            </h3>
            <p className="text-gray-700">
              Pour participer à l'événement, veuillez vous inscrire via notre 
              formulaire d'inscription en ligne. Un badge personnalisé vous sera 
              délivré pour faciliter votre accès à l'événement.
            </p>
          </div>
        </div>

        {/* Statistiques des événements passés */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            Éditions précédentes en chiffres
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {previousStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow transform hover:-translate-y-1 duration-300"
                >
                  <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-gray-800">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sponsors */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-10">Nos Sponsors</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {sponsors.map((sponsor) => (
              <div 
                key={sponsor.id} 
                className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <img 
                  src={sponsor.logo} 
                  alt={`${sponsor.name} logo`} 
                  className="h-20 object-contain mb-4"
                />
                <h3 className="text-lg font-medium text-gray-800">{sponsor.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
