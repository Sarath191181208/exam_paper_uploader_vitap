import { useState } from "react";
import { validateUploadForm } from "app/validators/validateUpload";

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
    const newErrors: FormErrors = validateUploadForm(formState)
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
