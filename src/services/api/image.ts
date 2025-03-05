import { CatImage, UploadImageResponse } from "@/src/types";
import { api, base64ToBlob, createFormData, getMimeTypeFromBase64 } from "@/src/utils";
import { getVotesForImage } from "./votes";
import { getFavorites } from "./favourites";

export const uploadImage = async (imageBase64: string): Promise<UploadImageResponse> => {
  try {
   
    const formData = createFormData(imageBase64);
    const formHeaders = { headers: { "Content-Type": "multipart/form-data" } };
    const response = await api.post("/images/upload", formData, formHeaders);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUploadedImages = async (): Promise<CatImage[]> => {
  try {
    const response = await api.get("/images?limit=10");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loadCats = async () => {
  const images = await getUploadedImages();
  const imageVotes = await getVotesForImage();
  const imageFavorites = await getFavorites();
  return images.map((cat) => {
    const votes = imageVotes.filter((vote) => vote.image_id === cat.id);
    const upVotes = votes.filter((vote) => vote.value === 1).length;
    const downVotes = votes.filter((vote) => vote.value === 0).length;
    const favouriteInformation = imageFavorites.find((f) => f.image_id === cat.id);
    return {
      ...cat,
      isFavourite: !!favouriteInformation,
      favouriteId: favouriteInformation?.id,
      score: upVotes - downVotes,
    };
  });
};
