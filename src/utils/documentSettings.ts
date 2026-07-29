
export interface DocumentItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  fileUrl: string;
  fileName: string;
  downloadCount: number;
}

const LOCAL_STORAGE_KEY = 'event_documents';

// Default documents
const defaultDocuments: DocumentItem[] = [
  {
    id: 'program',
    title: 'Programme de l\'événement',
    description: 'Consultez le programme complet de l\'événement',
    iconName: 'book',
    fileUrl: '',
    fileName: '',
    downloadCount: 0
  },
  {
    id: 'access',
    title: 'Plan d\'accès',
    description: 'Comment se rendre à l\'événement',
    iconName: 'map-pin',
    fileUrl: '',
    fileName: '',
    downloadCount: 0
  },
  {
    id: 'expo',
    title: 'Plan d\'exposition',
    description: 'Plan détaillé de l\'exposition',
    iconName: 'layout-grid',
    fileUrl: '',
    fileName: '',
    downloadCount: 0
  },
  {
    id: 'media',
    title: 'Catalogue officiel / Kit média',
    description: 'Téléchargez notre dossier de presse',
    iconName: 'file-text',
    fileUrl: '',
    fileName: '',
    downloadCount: 0
  }
];

export const getDocuments = (): DocumentItem[] => {
  try {
    const storedDocuments = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedDocuments ? JSON.parse(storedDocuments) : defaultDocuments;
  } catch (error) {
    console.error("Error loading documents:", error);
    return defaultDocuments;
  }
};

export const saveDocuments = (documents: DocumentItem[]): void => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(documents));
  } catch (error) {
    console.error("Error saving documents:", error);
  }
};

export const incrementDownloadCount = (documentId: string): void => {
  try {
    const documents = getDocuments();
    const updatedDocuments = documents.map(doc => 
      doc.id === documentId 
        ? { ...doc, downloadCount: doc.downloadCount + 1 } 
        : doc
    );
    saveDocuments(updatedDocuments);
  } catch (error) {
    console.error("Error incrementing download count:", error);
  }
};
