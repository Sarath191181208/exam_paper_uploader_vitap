import {
  doc,
  getDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "app/firebase/firebase";
import { getStorageImageUploadPath, getUserUploadDocPath } from "app/firebase/paths";

export async function uploadPDF(
  userId: string,
  pdfFile: File,
): Promise<string> {
  const userUploadRef = doc(firestore, getUserUploadDocPath(userId));
  const userUploadDoc = await getDoc(userUploadRef);
  let numberOfUploads = 0;
  if (userUploadDoc.exists()) {
    numberOfUploads = userUploadDoc.data().numberOfUploads || 0;
  }
  // Check if the user has exceeded the upload limit
  const totalUploads = numberOfUploads + 1;
  if (totalUploads > 150) {
    throw new Error(
      "Upload limit exceeded. You can only upload up to 150 pdfs."
    );
  }

  // Extract the original file extension from the file
  const fileExtension = pdfFile.name.split(".").pop();
  const fileName = `${numberOfUploads}.${fileExtension}`;

  // Create a reference to the storage location using the index as the file name
  const storageRef = ref(
    storage,
    getStorageImageUploadPath(userId, fileName)
  );

  const uploadResult = await uploadBytes(storageRef, pdfFile);
  const downloadURL = await getDownloadURL(uploadResult.ref);

  return downloadURL
}
