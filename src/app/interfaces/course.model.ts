export interface Course {
    id?: string; // Optional ID for Firestore document
    name: string;
    description: string;
    duration: number;
    dateStart: Date;
    dateEnd: Date;
    imageUrl?: string; // Added optional imageUrl property
  }