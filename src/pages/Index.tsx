
import React from "react";
import { Layout } from "@/components/Layout";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { CountdownTimer } from "@/components/CountdownTimer";
import { EventInformation } from "@/components/sections/EventInformation";
import { VisitorCategories } from "@/components/sections/VisitorCategories";
import { DocumentsSection } from "@/components/sections/DocumentsSection";
import { MediaLibrarySection } from "@/components/sections/MediaLibrarySection";
import { SponsorsSection } from "@/components/sections/SponsorsSection";
import { carouselImages, sponsors } from "@/components/data/mockData";

const Index = () => {
  return (
    <Layout>
      {/* Hero Carousel with Countdown */}
      <HeroCarousel carouselImages={carouselImages} />
      
      {/* Countdown Timer */}
      <CountdownTimer />
      
      {/* Event Information */}
      <EventInformation />
      
      {/* Visitor Categories Section */}
      <VisitorCategories />
      
      {/* Documents Section */}
      <DocumentsSection />
      
      {/* Media Library Section */}
      <MediaLibrarySection />
      
      {/* Sponsors Section */}
      <SponsorsSection sponsors={sponsors} />
    </Layout>
  );
};

export default Index;
