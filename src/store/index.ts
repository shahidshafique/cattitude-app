import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { PersistentStorage } from "./storage";
import { createCatSlice } from "./cat-slice";
import { CatSlice } from "./cat-slice.types";

type PrimitiveType = string | number | boolean;

const storage = PersistentStorage;

const zustandStorage = {
  setItem: (name: string, value: PrimitiveType) => PersistentStorage.setItem(name, JSON.stringify(value)),
  getItem: (name: string) => PersistentStorage.getItem(name),
  removeItem: (name: string) => PersistentStorage.removeItem(name),
};

export const useBoundStore = create(
  persist<CatSlice>(
    (...a) => ({
      ...createCatSlice(...a),
    }),
    { name: "bound-store", storage: createJSONStorage(() => zustandStorage) },
  ),
);
