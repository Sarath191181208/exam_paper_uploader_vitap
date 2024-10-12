"use client";
import React, { useEffect, useState } from "react";
import { NotebookPen } from "lucide-react";
import { fetchAvailableCourseCodes } from "@/app/firebase/fetchData";
import { useRouter } from "next/navigation";
import { ExamType } from "@/app/data/ExamEntry";


const CardsPage = ({ params }: { params: { EXAM_TYPE: string } }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [cardsData, setCardsData] = useState<{ [key: string]: boolean }>({});
  const EXAM_TYPE: ExamType = params.EXAM_TYPE as ExamType;
  const router = useRouter();

  useEffect(() => {
    const fetchCards = async () => {
      const courses: { [key: string]: boolean } =
        await fetchAvailableCourseCodes(EXAM_TYPE);
      const sortedCourses = Object.keys(courses)
        .sort()
        .reduce((acc, key) => {
          acc[key] = courses[key];
          return acc;
        }, {} as { [key: string]: boolean });
      setIsLoading(false);
      setCardsData(sortedCourses);
    };

    fetchCards();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }

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
          <SubjectCard
            onClick={() => router.push(`/papers/${EXAM_TYPE}/${key}`)}
            className="flex items-center gap-4 cursor-pointer"
            key={key}
          >
            <NotebookPen className="text-indigo-400 text-6xl mb-4" />
            <IconCardTitle title={key} />
          </SubjectCard>
        )
      ))}
    </div>
  );
};

const IconCardTitle = ({ title }: { title: string }) => (
  <h2 className="text-2xl font-semibold mb-4">{title}</h2>
);

const SubjectCard = (
  { children, className, onClick = () => {}}: { children: React.ReactNode; className: string, onClick: () => void},
) => (
  <div
    onClick={onClick}
    className={`bg-gray-800 rounded-lg shadow-lg p-6 hover:scale-105 transition-all text-center ${className}`}
  >
    {children}
  </div>
);

export default CardsPage;


