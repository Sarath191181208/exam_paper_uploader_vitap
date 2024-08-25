import imageCompression from "browser-image-compression";

export async function compressImages(images: string[]){
  const options = {
    maxSizeMB: 0.25,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  const imagesAsFiles = await Promise.all(
    images.map(async (url) => {
      const res = await fetch(url);
      const blob = await res.blob();
      return new File([blob], "image.jpg", { type: "image/jpeg" });
    }),
  );

  const compressedImages = await Promise.all(
    imagesAsFiles.map((image) => imageCompression(image, options)),
  );

  return compressedImages;
}
