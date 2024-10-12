import { doc, getDoc } from "firebase/firestore";
import { firestore } from "./firebase";
import { getCourseCodeAvaliableDocPath, getExamEntryDocPath } from "./paths";
import { CourseCode, ExamEntry, ExamType } from "../data/ExamEntry";

export const fetchAvailableCourseCodes = async ( examType: ExamType ) : Promise<{ [key: string]: boolean }> => {
  const path = getCourseCodeAvaliableDocPath(examType);
  console.log( path );
  const resp = await getDoc( doc(firestore, path) );
  console.log( resp.data() );
  
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
    console.log( data );
    // conver the data.examDate and data.uploadedDate into date object 
    Object.keys(data).forEach( key => {
      data[key].examDate = new Date(data[key].examDate);
      data[key].uploadedDate = new Date(data[key].uploadedDate);
    }); 
    return data;
  }

  return {};
}
