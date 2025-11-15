
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string; // Base64 encoded image
  whatsappNumber?: string;
}

export interface GalleryImage {
  id: string;
  imageUrl: string;
}

export interface HomepageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  aboutText1: string;
  aboutText2: string;
  aboutImageUrl: string;
}
