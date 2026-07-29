import { Participant } from "@/components/register/RegisterSchemas";

const PARTICIPANTS_KEY = "participants";
const CURRENT_KEY = "currentParticipant";

export function generateId(): string {
  const part1 = Math.random().toString(36).substring(2, 15);
  const part2 = Math.random().toString(36).substring(2, 15);
  return part1 + part2;
}

export function getParticipants(): Participant[] {
  try {
    const stored = localStorage.getItem(PARTICIPANTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveParticipant(participant: Participant): void {
  const participants = getParticipants();
  participants.push(participant);
  localStorage.setItem(PARTICIPANTS_KEY, JSON.stringify(participants));
  sessionStorage.setItem(CURRENT_KEY, JSON.stringify(participant));
}

export function getCurrentParticipant(): Participant | null {
  try {
    const stored = sessionStorage.getItem(CURRENT_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}
