"use client";
import ExamCard from "@/app/components/ExamCard";
import { CourseCode, ExamEntry, ExamType } from "@/app/data/ExamEntry";
import { fetchExamEntries } from "@/app/firebase/fetchData";
import React from "react";

import { useEffect, useState } from "react";

export default function Home(
  { params }: { params: { EXAM_TYPE: ExamType; COURSE_CODE: CourseCode } },
) {
  const [examData, setExamData] = useState<{ [key: string]: ExamEntry }>({});

  useEffect(() => {
    const fetchExams = async () => {
      const data = await fetchExamEntries(params.EXAM_TYPE, params.COURSE_CODE);
      console.log(data);
      setExamData(data);
    };

    fetchExams();
  }, []);

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
