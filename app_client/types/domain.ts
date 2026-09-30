export type UserSummary = {
  _id: string;
  username: string;
  email: string;
};

export type Review = {
  _id: string;
  comment: string;
  rating: number;
  createdAt?: string;
  author?: UserSummary | string;
};

export type ListingImage = {
  url?: string;
  filename?: string;
};

export type Listing = {
  _id: string;
  title: string;
  description?: string;
  gender: 'boys' | 'girls';
  price: number;
  address: string;
  amenities?: string[];
  images?: ListingImage[];
  owner?: UserSummary | string;
  reviews?: Review[];
  location?: {
    type?: 'Point';
    coordinates?: number[];
  };
  createdAt?: string;
  updatedAt?: string;
};
