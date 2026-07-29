
export interface Participant {
  id: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  photo?: string;
  registrationDate: string;
  scanned: boolean;
  approved?: boolean;
  type?: "participant" | "exhibitor" | "press";
  media?: string;
  formula?: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'scanner' | 'viewer';
  lastLogin?: string;
}
