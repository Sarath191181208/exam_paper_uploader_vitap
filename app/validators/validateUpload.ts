import { FormErrors, FormState } from "app/hooks/uploadPaperForm";

export function validateUploadForm(formState: FormState): FormErrors {
    const newErrors: FormErrors = {};
    const COURSE_CODE_REGEX = /\w{3}\d{4}/;

    // validate name errors
    if (!formState.name) newErrors.name = "Name is required.";

    // check required course code and format
    if (!formState.courseCode) {
        newErrors.courseCode = "Course Code is required.";
    } else if (!COURSE_CODE_REGEX.test(formState.courseCode)) {
        newErrors.courseCode = 'Course code should be in the format "CSE1004".';
    }

    // check required exam type
    if (!formState.examType || formState.examType == undefined) {
        newErrors.examType = "Type of the Exam is required.";
    }

    // check required exam slot
    if (!formState.examSlot || formState.examSlot == undefined) newErrors.examSlot = "Exam Slot is required.";

    // check required exam date and if inputed future date
    if (formState.examDate == undefined) newErrors.examDate = "Date is required";
    else {
        if (formState.examDate > new Date()) newErrors.examDate = "Date shouldn't be in the future.";
    }

    return newErrors;
}
