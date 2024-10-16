import {
  runTransaction,
  doc,
  increment,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "app/firebase/firebase";
import { getStorageImageUploadPath, getUserUploadDocPath } from "app/firebase/paths";

export async function uploadImages(
  userId: string,
  images: File[],
  courseCode: string
): Promise<string[]> {
  // Reference to the Firestore document for the user's upload count
  const userUploadRef = doc(firestore, getUserUploadDocPath(userId));

  // Start a Firestore transaction
  const downloadURLs: string[] = await runTransaction(
    firestore,
    async (transaction) => {
      // Get current numberOfUploads value
      const userUploadDoc = await transaction.get(userUploadRef);
      let numberOfUploads = 0;

      if (userUploadDoc.exists()) {
        numberOfUploads = userUploadDoc.data().numberOfUploads || 0;
      }

      // Check if the user has exceeded the upload limit
      const totalUploads = numberOfUploads + images.length;
      if (totalUploads > 150) {
        throw new Error(
          "Upload limit exceeded. You can only upload up to 150 images."
        );
      }

      // Upload the images in parallel and store their download URLs
      const uploadPromises = images.map(async (image, i) => {
        // Extract the original file extension from the image
        const fileExtension = image.name.split(".").pop(); // e.g., 'jpg', 'png'
        const fileName = `${i}.${fileExtension}`;

        // Create a reference to the storage location using the index as the file name
        const storageRef = ref(
          storage,
          getStorageImageUploadPath(userId, fileName)
        );

        const uploadResult = await uploadBytes(storageRef, image);
        return getDownloadURL(uploadResult.ref);
      });

      const downloadURLs = await Promise.all(uploadPromises);

      // Increment the numberOfUploads
      transaction.set(userUploadRef, {
        numberOfUploads: increment(images.length),
      }, {merge: true});
      return downloadURLs;
    }
  );

  // Return the URLs of the uploaded images
  return downloadURLs;
}
