"use server";

import { doc, runTransaction, setDoc } from "firebase/firestore";

import { getCourseCodeAvaliableDocPath, getExamEntryDocPath } from "app/firebase/paths";
import { uploadActionStates } from "app/actions/actionStates";
import { firestore } from "app/firebase/firebase";
import { FormState } from "app/hooks/uploadPaperForm";

import { validateUploadForm } from "app/validators/validateUpload";
import { validateImages } from "app/validators/validateImages";
import { validateUser } from "app/validators/validateUser";

export async function uploadAction(
  examData: FormState,
  imageURLs: string[],
  authToken: string,
) {
  let { errState, user } = await validateUser(authToken);
  if (errState != null || user == null) {
    return {
      state: errState,
    };
  }

  const errors = validateUploadForm(examData);
  if (Object.keys(errors).length > 0) {
    return {
      state: uploadActionStates.validationError,
      errors,
    };
  }

  errState = validateImages(imageURLs);
  if (errState != null) {
    return {
      state: errState,
    };
  }

  const examType = examData.examType!;
  const uploadedDate = (new Date()).toISOString();

  const paperEntry = {
    name: examData.name,
    courseCode: examData.courseCode,
    examType,
    examSlot: examData.examSlot,
    examDate: examData.examDate?.toISOString(),
    imageURLs,

    uploadedDate,
    uploader: user.email,
  };

  try {
    runTransaction(firestore, async (transaction) => {
      const papersRef = doc(
        firestore,
        getExamEntryDocPath(examData.courseCode, examType),
      );
      transaction.set(papersRef, {
        [user.uid]: paperEntry,
      }, {merge: true});
      const uploadsRef = doc(firestore, getCourseCodeAvaliableDocPath(examType));
      transaction.set(uploadsRef, {
        [examData.courseCode]: true,
      }, {merge: true});
    });
  } catch (error) {
    console.error("Error updating document: ", error);
    return {
      state: uploadActionStates.unknownError,
    };
  }

  return {
    state: uploadActionStates.success,
    user,
  };
}
