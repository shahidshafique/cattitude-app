import { ImageWithDetails } from "../types";

export type CatSlice = {
  cats: ImageWithDetails[];
  isLoading: boolean;
  error: Error | null;
  setCats: () => Promise<void>;
  likeCat: (catId: string) => Promise<void>;
  dislikeCat: (catId: string) => Promise<void>;
  toggleFavouriteCat: (catId: string) => Promise<void>;
};
