import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#f0f0f0",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 200,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  favoriteButton: {
    padding: 8,
  },
  voteContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  voteButton: {
    padding: 8,
  },
  score: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 12,
  },
});
