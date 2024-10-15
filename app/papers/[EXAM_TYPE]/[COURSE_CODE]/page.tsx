import ExamCard from "@/app/components/ExamCard";
import { CourseCode, ExamEntry, ExamType } from "@/app/data/ExamEntry";
import { fetchExamEntries } from "@/app/firebase/fetchData";
import Image from "next/image";
import React from "react";

export default async function Home(
  { params }: { params: { EXAM_TYPE: ExamType; COURSE_CODE: CourseCode } },
) {
  const examData = await fetchExamEntries(
    params.EXAM_TYPE,
    params.COURSE_CODE.toUpperCase(),
  );

  return (
    <div className="container mx-auto py-12">
      <div className="">
        {Object.values(examData).map((data: ExamEntry, index: number) => (
          <div>
            <ExamCard key={index} {...data} />
            <div className="flex gap-4 mt-4 overflow-x-scroll overflow-y-hidden">
              {data.imageURLs.map((url, idx: number) => (
               <a href={url} target="_blank" rel="noopener noreferrer">
                <div
                  key={index}
                  className="relative w-full h-52 bg-transparent flex items-center justify-center rounded-lg"
                >
                  <Image
                    key={idx}
                    src={url}
                    alt={`Image ${idx + 1} for ${data.name}`}
                    width={1080} // Provide appropriate width
                    height={720} // Provide appropriate height
                    className="w-full min-w-[320px]"
                  />
                </div>
              </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
