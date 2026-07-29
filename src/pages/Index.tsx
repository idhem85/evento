import React from "react";
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
    <>
      <HeroCarousel carouselImages={carouselImages} />
      <CountdownTimer />
      <EventInformation />
      <VisitorCategories />
      <DocumentsSection />
      <MediaLibrarySection />
      <SponsorsSection sponsors={sponsors} />
    </>
  );
};

export default Index;
