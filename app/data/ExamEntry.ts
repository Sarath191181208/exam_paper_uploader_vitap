export type CourseCode = string;
export type ExamType = "cat" | "cat1" | "cat2" | "fat";

export type ExamSlot =
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

export type ExamEntry = {
  courseCode: CourseCode;
  examDate: Date;
  examSlot: ExamSlot;
  examType: ExamType;
  pdfURL: string;
  name: string;
  uploadedDate: Date;
  uploader: string;
}
