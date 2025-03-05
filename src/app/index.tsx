import React, { useState, useCallback } from "react";
import { View, FlatList, ActivityIndicator, Text, RefreshControl } from "react-native";
import { CatCard } from "../components/CatCard";
import { Error } from "../components/Error/Error";
import { styles } from "./index.styles";
import { useHome } from "./hooks/useHome";


export default function Home() {
  const {loading, refreshing, error, loadCats, onRefresh, cats} = useHome()
 

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) return <Error onRefresh={onRefresh} error={error} />;

  if (cats.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No cat images found.</Text>
        <Text style={styles.uploadPrompt}>Upload some cute cats!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={cats}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <CatCard cat={item} />}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={styles.listContainer}
    />
  );
}
