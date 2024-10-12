import ExamCard from "@/app/components/ExamCard";
import { CourseCode, ExamEntry, ExamType } from "@/app/data/ExamEntry";
import { fetchExamEntries } from "@/app/firebase/fetchData";
import React from "react";

export default async function Home(
  { params }: { params: { EXAM_TYPE: ExamType; COURSE_CODE: CourseCode } },
) {
  const examData = await fetchExamEntries(params.EXAM_TYPE, params.COURSE_CODE.toUpperCase())

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.values(examData).map((data: ExamEntry, index: number) => (
          <ExamCard key={index} {...data} />
        ))}
      </div>
    </div>
  );
}
