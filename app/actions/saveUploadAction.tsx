import { getCourseCodeAvaliableDocPath, getExamEntryDocPath } from "app/firebase/paths";
import { uploadActionStates } from "app/actions/actionStates";
import { FormState } from "app/hooks/uploadPaperForm";

import { validateUploadForm } from "app/validators/validateUpload";
import { doc, runTransaction } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { User } from "firebase/auth";

export async function uploadAction(
  examData: FormState,
  pdfURL: string,
  user: User
) {
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

    await runTransaction(firestore, async (transaction) => {
      const papersRef = doc(
        firestore,
        getExamEntryDocPath(paperEntry.courseCode, examType),
      );
      transaction.set(papersRef, {
        [user.uid]: paperEntry,
      }, { merge: true });
      const uploadsRef = doc(firestore,getCourseCodeAvaliableDocPath(examType));
      transaction.set(uploadsRef, {
        [paperEntry.courseCode]: true,
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
