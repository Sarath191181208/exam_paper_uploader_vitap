import { CourseCode, ExamType } from "../hooks/uploadPaperForm";

export function getUserUploadDocPath(userId: string): string {
  return `/users_uploads/${userId}`;
}

export function getStorageImageUploadPath(
  userId: string,
  filename: string,
): string {
  return `${userId}/${filename}`;
}

export function getExamEntryDocPath(
  courseCode: CourseCode, 
  examType: ExamType,
): string {
  return `${examType}/${courseCode}`;
}

export function getCourseCodeAvaliableDocPath(
  examType: ExamType 
) : string{
  //return "uploads", examType
  return `uploads/${examType}`
}
