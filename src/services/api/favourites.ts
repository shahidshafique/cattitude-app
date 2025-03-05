import { AddFavoriteResponse, RemoveFavoriteResponse, GetFavoritesResponse } from "@/src/types";
import { api } from "@/src/utils";

export const addFavorite = async (imageId: string): Promise<AddFavoriteResponse> => {
  try {
    const response = await api.post("/favourites", { image_id: imageId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeFavorite = async (favoriteId: number): Promise<RemoveFavoriteResponse> => {
  try {
    const response = await api.delete(`/favourites/${favoriteId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFavorites = async (): Promise<GetFavoritesResponse[]> => {
  try {
    const response = await api.get(`/favourites`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
