import React from "react";
import { View, Image, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { styles } from "./CatCard.styles";
import { CatCardProps } from "./CatCard.types";
import { Ionicons } from "@expo/vector-icons";
import { useCatCard } from "./hook/useCatCard";

export const CatCard: React.FC<CatCardProps> = ({ cat }) => {
  const { toggleFavourite, likeCat, dislikeCat, isLoading, isFavouriteLoading } = useCatCard();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: cat.url }} style={styles.image} resizeMode="cover" />
        <View style={styles.actions}>
          {!isFavouriteLoading ? (
            <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavourite(cat.id)} disabled={isLoading}>
              <Ionicons name={cat.isFavourite ? "heart" : "heart-outline"} size={24} color={cat.isFavourite ? "#ff4081" : "#333"} />
            </TouchableOpacity>
          ) : (
            <ActivityIndicator />
          )}

          <View style={styles.voteContainer}>
            <TouchableOpacity style={styles.voteButton} onPress={() => likeCat(cat.id)} disabled={isLoading}>
              <Ionicons name="thumbs-up" size={20} color="#333" />
            </TouchableOpacity>

            <Text style={styles.score}>{cat.score}</Text>

            <TouchableOpacity style={styles.voteButton} onPress={() => dislikeCat(cat.id)} disabled={isLoading}>
              <Ionicons name="thumbs-down" size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
