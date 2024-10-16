"use server";

import { getCourseCodeAvaliableDocPath, getExamEntryDocPath } from "app/firebase/paths";
import { uploadActionStates } from "app/actions/actionStates";
import { FormState } from "app/hooks/uploadPaperForm";

import { validateUploadForm } from "app/validators/validateUpload";
import { validateUser } from "app/validators/validateUser";

import { firestoreAdmin } from "app/firebase/firebaseAdmin";

export async function uploadAction(
  examData: FormState,
  pdfURL: string,
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

  if (pdfURL == null || pdfURL == "") {
    return {
      state: uploadActionStates.validationError
    }
  }

  //TODO: Check for valid firebase pdf url 

  try {
    const examType = examData.examType!;
    const uploadedDate = (new Date()).toISOString();

    const paperEntry = {
      name: examData.name,
      courseCode: examData.courseCode.toUpperCase(),
      examType,
      examSlot: examData.examSlot!,
      examDate: examData.examDate!.toISOString(),
      pdfURL,

      uploadedDate,
      uploader: user.email,
    };

    firestoreAdmin.runTransaction(async (transaction) => {
      const papersRef = firestoreAdmin.doc(
        getExamEntryDocPath(paperEntry.courseCode, examType),
      );
      transaction.set(papersRef, {
        [user.uid]: paperEntry,
      }, { merge: true });
      const uploadsRef = firestoreAdmin.doc(getCourseCodeAvaliableDocPath(examType));
      transaction.set(uploadsRef, {
        [examData.courseCode]: true,
      }, { merge: true });
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
