import React from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { styles } from "./UploadForm.styles";
import { useUploadForm } from "./hooks/useUploadForm";

export const UploadForm = () => {
  const { image, pickImage, error, isUploading, handleUpload } = useUploadForm();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>

      {image && (
        <View style={styles.imagePreviewContainer}>
          <Image source={{ uri: image }} style={styles.imagePreview} />
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <TouchableOpacity style={[styles.uploadButton, (!image || isUploading) && styles.disabledButton]} onPress={handleUpload} disabled={!image || isUploading}>
        {isUploading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Upload Cat Image</Text>}
      </TouchableOpacity>
    </View>
  );
};

