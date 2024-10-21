import { doc, getDoc } from "firebase/firestore";
import { firestore } from "./firebase";
import { getCourseCodeAvaliableDocPath, getExamEntryDocPath } from "./paths";
import { CourseCode, ExamEntry, ExamType } from "../data/ExamEntry";

export const fetchAvailableCourseCodes = async ( examType: ExamType ) : Promise<{ [key: string]: boolean }> => {
  const path = getCourseCodeAvaliableDocPath(examType);
  const resp = await getDoc( doc(firestore, path) );
  
  if( resp.exists() ) {
    return resp.data() as { [key: string]: boolean };
  }
  return {};
}

export const fetchExamEntries = async ( examType: ExamType, courseCode: CourseCode ) => {
  const path = getExamEntryDocPath( courseCode, examType );
  const resp = await getDoc( doc(firestore, path) );
  if( resp.exists() ) { 
    const data =  resp.data() as { [key: string] : ExamEntry};
    // conver the data.examDate and data.uploadedDate into date object 
    Object.keys(data).forEach( user_id => {
      data[user_id].examDate = new Date(data[user_id].examDate);
      data[user_id].uploadedDate = new Date(data[user_id].uploadedDate);
    }); 
    return data;
  }

  return {};
}
