import React, { useState } from "react";
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../../../services";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";

export const useUploadForm = () => {
  const [image, setImage] = useState<string | null | undefined>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const pickImage = async () => {
    setError(null);

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      setError("Permission to access camera is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ["images"] });

    if (result.canceled || !result.assets || result.assets.length === 0) return;
  

    if (Platform.OS !== "web") {
        const imageUri = result.assets[0].uri;

        const fileExtension = imageUri.split(".").pop()?.toLowerCase();
        let mimeType = "image/jpeg"; 
        if (fileExtension === "png") {
          mimeType = "image/png";
        } else if (fileExtension === "jpg" || fileExtension === "jpeg") {
          mimeType = "image/jpeg";
        } else {
          setError("Unsupported image format. Please choose a PNG or JPEG image.");
          return;
        }
      const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: FileSystem.EncodingType.Base64 });
      setImage(`data:${mimeType};base64,${base64}`);
    } else {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    setIsUploading(true);
    setError(null);
    try {
      await uploadImage(image!);
      router.dismiss();
    } catch (error: any) {
      setError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return {
    image,
    handleUpload,
    pickImage,
    error,
    isUploading,
  };
};
