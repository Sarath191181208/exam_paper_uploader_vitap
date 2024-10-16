import React from "react";
import { NotebookPen } from "lucide-react";
import { fetchAvailableCourseCodes } from "@/app/firebase/fetchData";
import { ExamType } from "@/app/data/ExamEntry";
import Link from "next/link";


const CardsPage = async ({ params }: { params: { EXAM_TYPE: string } }) => {
  const EXAM_TYPE: ExamType = params.EXAM_TYPE as ExamType;
  const cardsData = await fetchAvailableCourseCodes(EXAM_TYPE);

  if (Object.keys(cardsData).length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <h1 className="text-4xl font-semibold">No data available</h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
      {Object.keys(cardsData).map((key) => (
        cardsData[key] && (
          <Link key={key} href={`/papers/${EXAM_TYPE}/${key}`}>
            <SubjectCard
              className="flex items-center gap-4 cursor-pointer"
              key={key}
            >
              <NotebookPen className="text-indigo-400 text-6xl mb-4" />
              <IconCardTitle title={key} />
            </SubjectCard>
          </Link>
        )
      ))}
    </div>
  );
};

const IconCardTitle = ({ title }: { title: string }) => (
  <h2 className="text-2xl font-semibold mb-4">{title}</h2>
);

const SubjectCard = (
  { children, className }: { children: React.ReactNode; className: string },
) => (
  <div
    className={`bg-gray-800 rounded-lg shadow-lg p-6 hover:scale-105 transition-all text-center ${className}`}
  >
    {children}
  </div>
);

export default CardsPage;


