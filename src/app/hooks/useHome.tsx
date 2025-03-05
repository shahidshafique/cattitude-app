import { useState, useCallback } from "react";
import { useBoundStore } from "../../store";
import { useFocusEffect } from "expo-router";

export const useHome = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { cats, setCats } = useBoundStore();

  const loadCats = useCallback(async () => {
    setLoading(true);
    await setCats();
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCats();
    }, []),
  );

  const onRefresh = () => {
    setRefreshing(true);
    setError(null);
    loadCats();
  };

  return { loading, refreshing, error, loadCats, onRefresh, cats };
};
