// app/upload.tsx
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import {UploadForm} from "../components/UploadForm";

export default function Upload() {
  return (
    <ScrollView style={styles.container}>
      <UploadForm />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
