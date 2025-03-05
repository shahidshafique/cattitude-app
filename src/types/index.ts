// types/index.ts
export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
  sub_id?: string;
}

export interface Favorite {
  id: number;
  image_id: string;
  sub_id: string;
  created_at: string;
}

export interface FavoriteResponse {
  message: string;
  id: number;
}

export interface Vote {
  id: number;
  image_id: string;
  sub_id: string;
  value: number; // 1 for up, 0 for down
  created_at: string;
}

export interface VoteOnImageResponse {
  message: string;
  id: number;
}

export interface GetVoteImageResponse {
  id: number;
  image_id: string;
  sub_id: string | null;
  created_at: string;
  value: number;
  country_code: string;
}

export interface ImageWithDetails extends CatImage {
  isFavourite: boolean;
  favouriteId?: number;
  score: number;
}

export interface UploadImageResponse {
  approved: number;
  id: string;
  url: string;
  width: number;
  height: number;
  original_filename: string;
  pending: number;
}

export interface AddFavoriteResponse {
  message: string;
  id: number;
}

export interface RemoveFavoriteResponse {
  message: string;
}

export interface GetFavoritesResponse {
  id: number;
  user_id: string;
  image_id: string;
  sub_id: string | null;
  created_at: string;
  image: {
    id: string;
    url: string;
  };
}
