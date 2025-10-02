"use client";

import * as faceapi from "face-api.js";

export const FACE_MODEL_URI = "/models/face-detector";

export const loadFaceApiModels = async (modelUrl: string = FACE_MODEL_URI) => {
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(modelUrl),
    faceapi.nets.faceLandmark68Net.loadFromUri(modelUrl),
    faceapi.nets.faceRecognitionNet.loadFromUri(modelUrl),
  ]);
};

export const getFaceDescriptor = async (
  imageSrc: string,
): Promise<Float32Array | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imageSrc;
    img.crossOrigin = "anonymous";

    img.onload = async () => {
      const detection = await faceapi
        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();
      resolve(detection?.descriptor || null);
    };
    img.onerror = () => {
      console.error("Error loading image");
      resolve(null);
    };
  });
};

export const compareFaceDescriptors = (
  descriptor1: Float32Array,
  descriptor2: Float32Array,
  threshold = 0.6, // 0.6 is commonly used for face-api.js
) => {
  const distance = faceapi.euclideanDistance(descriptor1, descriptor2);
  return {
    match: distance < threshold,
    distance,
  };
};

export const cropFaceFromImage = async (
  imageSrc: string,
): Promise<string | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imageSrc;
    img.crossOrigin = "anonymous";
    img.onload = async () => {
      const detection = await faceapi.detectSingleFace(
        img,
        new faceapi.TinyFaceDetectorOptions(),
      );

      if (!detection) {
        resolve(null);
        return;
      }

      const { x, y, width, height } = detection.box;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(null);
        return;
      }

      ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => resolve(null);
  });
};

export const dataURLtoFile = (dataUrl: string, filename: string): File => {
  const arr = dataUrl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "image/png";
  const bstr = atob(arr[1]); // Decode base64
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

export async function rotateImageFile(
  file: File,
  rotationDegree: number,
): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject("Canvas context not found");
          return;
        }

        // Swap width/height if rotated 90 or 270 degrees
        if (rotationDegree % 180 !== 0) {
          canvas.width = img.height;
          canvas.height = img.width;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }

        // Move to center for rotation
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotationDegree * Math.PI) / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);

        canvas.toBlob((blob) => {
          if (!blob) {
            reject("Failed to convert canvas to blob");
            return;
          }
          const rotatedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
          resolve(rotatedFile);
        }, file.type);
      };
      if (event.target?.result) {
        img.src = event.target.result as string;
      } else {
        reject("Failed to read file");
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
