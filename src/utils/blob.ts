import { Platform } from "react-native";

// Helper function from: https://www.geeksforgeeks.org/how-to-convert-base64-to-blob-in-javascript/
export const base64ToBlob = (base64: string, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(base64.split(",")[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

export const createFormData = (base64: string): FormData => {
  const mimeType = getMimeTypeFromBase64(base64);
  const formData = new FormData();
  formData.append(
    "file",
    Platform.OS === "web"
      ? base64ToBlob(base64, mimeType)
      : ({
          uri: base64,
          name: `photo.jpg`,
          type: mimeType,
        } as any),
  );

  return formData;
};

export const getMimeTypeFromBase64 = (base64: string): string => {
  const match = base64.match(/^data:(.+);base64,/);
  return match ? match[1] : "application/octet-stream";
};
