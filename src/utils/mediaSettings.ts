
export interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  title: string;
  description: string;
  url: string;
  thumbnailUrl?: string;
  date?: string;
}

const LOCAL_STORAGE_KEY = 'event_media_items';

// Default media items
const defaultMediaItems: MediaItem[] = [
  {
    id: 'photo1',
    type: 'photo',
    title: 'Conférence d\'ouverture 2023',
    description: 'Discours d\'ouverture par notre président',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
    date: '2023-06-15'
  },
  {
    id: 'photo2',
    type: 'photo',
    title: 'Ateliers collaboratifs',
    description: 'Participants aux ateliers techniques',
    url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b',
    date: '2023-06-15'
  },
  {
    id: 'video1',
    type: 'video',
    title: 'Résumé de l\'édition 2023',
    description: 'Les moments forts de notre dernier événement',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    date: '2023-06-17'
  }
];

export const getMediaItems = (): MediaItem[] => {
  try {
    const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedItems ? JSON.parse(storedItems) : defaultMediaItems;
  } catch (error) {
    console.error("Error loading media items:", error);
    return defaultMediaItems;
  }
};

export const saveMediaItems = (items: MediaItem[]): void => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Error saving media items:", error);
  }
};
