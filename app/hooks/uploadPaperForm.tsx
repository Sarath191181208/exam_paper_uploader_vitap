import { useState } from "react";
import { validateUploadForm } from "app/validators/validateUpload";

export type CourseCode = string;
export type ExamType = "cat1" | "cat2" | "fat";

type ExamSlot =
  | "A1"
  | "A2"
  | "B1"
  | "B2"
  | "C1"
  | "C2"
  | "D1"
  | "D2"
  | "E1"
  | "E2"
  | "F1"
  | "F2"
  | "G1"
  | "G2";

export interface FormState {
  name: string;
  courseCode: CourseCode;
  examType: ExamType | undefined;
  examSlot: ExamSlot | undefined;
  examDate: Date | undefined;
}

export type FormErrors =
  & {
    [K in keyof FormState]?: string;
  }
  & {
    errors?: string;
  };

export function getEmptyFormState(): FormState {
  return {
    name: "",
    courseCode: "",
    examType: undefined,
    examSlot: undefined,
    examDate: undefined,
  };
}

export function useUploadPaperForm() {
  const [formState, setFormState] = useState<FormState>(getEmptyFormState());
  const [errors, setErrors] = useState<FormErrors>({});
  const validateForm = () => {
    const newErrors: FormErrors = validateUploadForm(formState);
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
    setFormState,
  };
}
