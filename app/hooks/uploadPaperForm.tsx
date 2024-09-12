import { error } from "console";
import { useState } from "react";

export interface FormState {
  name: string;
  courseCode: string;
  examType: string;
  examSlot: string;
  examDate: Date | undefined;
}

export type FormErrors = {
  [K in keyof FormState]?: string;
} & {
  errors?: string;
};

export function getEmptyFormState(): FormState {
  return {
    name: "",
    courseCode: "",
    examType: "",
    examSlot: "",
    examDate: undefined,
  };
}

export function useUploadPaperForm() {
  const [formState, setFormState] = useState<FormState>(getEmptyFormState());
  const [errors, setErrors] = useState<FormErrors>({});
  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formState.name) newErrors.name = "Name is required.";
    if (!formState.courseCode) {
      newErrors.courseCode = "Course Code is required.";
    } else if (!/\w{3}\d{4}/.test(formState.courseCode)) {
      newErrors.courseCode = 'Course code should be in the format "CSE1004".';
    }
    if (!formState.examType) {
      newErrors.examType = "Type of the Exam is required.";
    }
    if (!formState.examSlot) newErrors.examSlot = "Exam Slot is required.";
    if (formState.examDate == undefined) newErrors.examDate = "Date is required";
    else {
      if (formState.examDate > new Date()) newErrors.examDate = "Date shouldn't be in the future.";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const [images, setImages] = useState<string[]>([]);

  return {
    formState,
    errors,
    images,
    validateForm,
    setImages,
    setErrors,
    setFormState
  }
}
