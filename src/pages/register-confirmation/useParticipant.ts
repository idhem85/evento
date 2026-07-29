
import { useState, useEffect } from "react";
import { from } from "@/integrations/supabase/client";

interface Participant {
  id: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  photo?: string;
  registrationDate: string;
  scanned: boolean;
  approved?: boolean;
  type?: string;
  formula?: string;
  media?: string;
}

export const useParticipant = () => {
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to get from sessionStorage first
    const storedParticipant = sessionStorage.getItem('currentParticipant');
    
    if (storedParticipant) {
      setParticipant(JSON.parse(storedParticipant));
      setLoading(false);
    } else {
      // If not in session, we can't do much
      setLoading(false);
    }
  }, []);

  return {
    participant,
    loading
  };
};
