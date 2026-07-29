
import { from } from "@/integrations/supabase/client";
import { Participant } from "../pages/dashboard/types";

// Define the participant type enum to match Supabase
type ParticipantType = "participant" | "exhibitor" | "press";

// Function to map Supabase participant to our Participant type
const mapSupabaseParticipant = (record: any): Participant => {
  return {
    id: record.id,
    name: record.name,
    email: record.email,
    phone: record.phone || "",
    organization: record.organization || "",
    registrationDate: record.registration_date,
    scanned: record.scanned || false,
    approved: record.approved,
    type: record.type as ParticipantType,
    media: record.media,
    formula: record.formula,
  };
};

// Function to get participants from Supabase
export const getParticipants = async (): Promise<Participant[]> => {
  try {
    const { data, error } = await from('participants')
      .select('*')
      .eq('type', 'participant');
      
    if (error) {
      console.error('Error fetching participants:', error);
      throw error;
    }
    
    return data.map(mapSupabaseParticipant);
  } catch (error) {
    console.error('Error loading participants:', error);
    // Fallback to mock data if there's an error
    return getMockParticipants();
  }
};

// Function to get exhibitors from Supabase
export const getExhibitors = async (): Promise<Participant[]> => {
  try {
    const { data, error } = await from('participants')
      .select('*')
      .eq('type', 'exhibitor');
      
    if (error) {
      console.error('Error fetching exhibitors:', error);
      throw error;
    }
    
    return data.map(mapSupabaseParticipant);
  } catch (error) {
    console.error('Error loading exhibitors:', error);
    // Fallback to mock data if there's an error
    return getMockExhibitors();
  }
};

// Function to get press members from Supabase
export const getPressMembers = async (): Promise<Participant[]> => {
  try {
    const { data, error } = await from('participants')
      .select('*')
      .eq('type', 'press');
      
    if (error) {
      console.error('Error fetching press members:', error);
      throw error;
    }
    
    return data.map(mapSupabaseParticipant);
  } catch (error) {
    console.error('Error loading press members:', error);
    // Fallback to mock data if there's an error
    return getMockPressMembers();
  }
};

// Function to update a participant in Supabase
export const updateParticipant = async (participant: Participant, type: string): Promise<void> => {
  try {
    // Convert our participant object to match Supabase schema
    // Ensure type is properly typed as "participant" | "exhibitor" | "press"
    const supabaseParticipant = {
      id: participant.id,
      name: participant.name,
      email: participant.email,
      phone: participant.phone,
      organization: participant.organization,
      photo: participant.photo,
      registration_date: participant.registrationDate,
      scanned: participant.scanned,
      approved: participant.approved,
      type: participant.type as ParticipantType,
      media: participant.media,
      formula: participant.formula,
    };
    
    const { error } = await from('participants')
      .update(supabaseParticipant)
      .eq('id', participant.id);
      
    if (error) {
      console.error('Error updating participant:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error updating participant:', error);
    throw error;
  }
};

// Function to add a new participant to Supabase
export const addParticipant = async (participant: Participant): Promise<void> => {
  try {
    // Convert our participant object to match Supabase schema
    // Ensure type is properly typed as "participant" | "exhibitor" | "press"
    const supabaseParticipant = {
      id: participant.id,
      name: participant.name,
      email: participant.email,
      phone: participant.phone,
      organization: participant.organization,
      photo: participant.photo,
      registration_date: new Date().toISOString(),
      scanned: participant.scanned || false,
      approved: participant.type === 'participant', // Participants auto-approved, others need approval
      type: participant.type as ParticipantType || 'participant',
      media: participant.media,
      formula: participant.formula,
    };
    
    const { error } = await from('participants')
      .insert(supabaseParticipant);
      
    if (error) {
      console.error('Error adding participant:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error adding participant:', error);
    throw error;
  }
};

// Mock data for fallback use in case of errors
const getMockParticipants = (): Participant[] => {
  return [
    {
      id: "p1",
      name: "Jean Dubois",
      email: "jean.dubois@example.com",
      phone: "06 12 34 56 78",
      organization: "ABC Corp",
      registrationDate: new Date(2023, 5, 15).toISOString(),
      scanned: true,
      type: "participant"
    },
    {
      id: "p2",
      name: "Marie Martin",
      email: "marie.martin@example.com",
      phone: "06 23 45 67 89",
      organization: "XYZ Inc",
      registrationDate: new Date(2023, 5, 16).toISOString(),
      scanned: false,
      type: "participant"
    }
  ];
};

const getMockExhibitors = (): Participant[] => {
  return [
    {
      id: "e1",
      name: "Tech Solutions",
      email: "contact@techsolutions.com",
      phone: "01 23 45 67 89",
      organization: "Tech Solutions SAS",
      registrationDate: new Date(2023, 4, 10).toISOString(),
      scanned: true,
      approved: false,
      type: "exhibitor"
    },
    {
      id: "e2",
      name: "Digital Marketing Pro",
      email: "info@dmppro.com",
      phone: "01 34 56 78 90",
      organization: "DMP International",
      registrationDate: new Date(2023, 4, 12).toISOString(),
      scanned: false,
      approved: false,
      type: "exhibitor"
    }
  ];
};

const getMockPressMembers = (): Participant[] => {
  return [
    {
      id: "m1",
      name: "Sophie Journaliste",
      email: "sophie@techpress.com",
      phone: "06 45 67 89 01",
      organization: "Tech Press Magazine",
      registrationDate: new Date(2023, 5, 5).toISOString(),
      scanned: true,
      approved: false,
      type: "press",
      media: "Tech Press"
    },
    {
      id: "m2",
      name: "Marc Reporter",
      email: "marc@infobusiness.com",
      phone: "06 56 78 90 12",
      organization: "Info Business",
      registrationDate: new Date(2023, 5, 8).toISOString(),
      scanned: false,
      approved: false,
      type: "press",
      media: "Info Business"
    }
  ];
};
