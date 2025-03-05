import { StateCreator } from "zustand";
import * as Api from "../services";
import { CatSlice } from "./cat-slice.types";
import { withOptimisticUpdate } from "../utils";

const initialCatSliceState = {
  cats: [],
  isLoading: false,
  error: null,
};

export const createCatSlice: StateCreator<CatSlice> = (set, get) => {
  return {
    ...initialCatSliceState,
    setCats: async () => {
      set({ isLoading: true, error: null });

      try {
        const processedCats = await Api.loadCats();
        set({ cats: processedCats, isLoading: false });
      } catch (error) {
        set({ error: error instanceof Error ? error : new Error(String(error)), isLoading: false });
      }
    },

    likeCat: async (catId: string) => {
      const { cats } = get();
      await withOptimisticUpdate(
        () => Api.voteOnImage(catId, 1),
        () => set({ cats: cats.map((cat) => (cat.id === catId ? { ...cat, score: cat.score + 1 } : cat)) }),
        () => set({ cats: cats.map((cat) => (cat.id === catId ? { ...cat, score: cat.score - 1 } : cat)) }),
      );

      await get().setCats();
    },

    dislikeCat: async (catId: string) => {
      const { cats } = get();

      await withOptimisticUpdate(
        () => Api.voteOnImage(catId, 0),
        () => set({ cats: cats.map((cat) => (cat.id === catId ? { ...cat, score: cat.score - 1 } : cat)) }),
        () => set({ cats: cats.map((cat) => (cat.id === catId ? { ...cat, score: cat.score + 1 } : cat)) }),
      );

      await get().setCats();
    },

    toggleFavouriteCat: async (catId: string) => {
      const { cats } = get();
      const cat = cats.find((cat) => cat.id === catId);

      if (!cat) return;

      const isFavourite = cat.isFavourite;
      await withOptimisticUpdate(
        () => (isFavourite ? Api.removeFavorite(cat.favouriteId!) : Api.addFavorite(catId)),
        () => set({ cats: cats.map((cat) => (cat.id === catId ? { ...cat, isFavourite: !isFavourite } : cat)) }),
        () => set({ cats: cats.map((cat) => (cat.id === catId ? { ...cat, isFavourite: isFavourite } : cat)) }),
      );

      await get().setCats();
    },
  };
};
