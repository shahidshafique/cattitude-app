import { useBoundStore } from "@/src/store";
import { useState } from "react";

export const useCatCard = () => {
  const [isFavouriteLoading, setIsFavouriteLoading] = useState<boolean>(false);
  const boundStore = useBoundStore();

  const toggleFavourite = async (catId: string) => {
    setIsFavouriteLoading(true);
    await boundStore.toggleFavouriteCat(catId);
    setIsFavouriteLoading(false);
  };

  return { ...boundStore, toggleFavourite, isFavouriteLoading };
};
