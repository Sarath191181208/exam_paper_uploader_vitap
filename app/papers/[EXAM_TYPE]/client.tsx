"use client";

import React, { useState, useEffect } from "react";
import { NotebookPen } from "lucide-react";
import { ExamType } from "@/app/data/ExamEntry";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { courseCodeToName } from "@/app/data/CoursecodeToName";
import { getShortForm } from "@/app/utils/toShortForm";

export const CardsClient = ({
  cardsData,
  EXAM_TYPE,
}: {
  cardsData: { [key: string]: any };
  EXAM_TYPE: ExamType;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCardsData, setFilteredCardsData] = useState(cardsData);

  useEffect(() => {
    const filteredData = Object.keys(cardsData).filter((courseCode) => {
      const courseName = courseCodeToName[courseCode] || '';
      const shortForm = getShortForm(courseName);
      const normalizedSearchTerm = searchTerm.toLowerCase();

      if (
        courseCode.toLowerCase().includes(normalizedSearchTerm) ||
        courseName.toLowerCase().includes(normalizedSearchTerm) ||
        shortForm.toLowerCase().includes(normalizedSearchTerm)
      ) {
        return true;
      }
      return false;
    });
    setFilteredCardsData(filteredData);
  }, [searchTerm, cardsData]);

  return (
    <div className="p-4">
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-10 bg-gray-800 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCardsData.length > 0 ? (
          filteredCardsData.map((coursecode: string) => (
            cardsData[coursecode] && (
              <Link key={coursecode} href={`/papers/${EXAM_TYPE}/${coursecode}`}>
                <SubjectCard
                  className="cursor-pointer"
                  key={coursecode}
                >
                  <div className="flex items-center gap-4">
                    <NotebookPen className="text-indigo-400 text-6xl mb-4" />
                    <IconCardTitle title={coursecode} />
                  </div>
                  <IconCardDescription>
                    {courseCodeToName[coursecode] || ''}
                  </IconCardDescription>
                </SubjectCard>
              </Link>
            )
          ))
        ) : (
          <div className="col-span-full text-center">
            <h2 className="text-xl font-semibold">No matching courses found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

const IconCardTitle = ({ title }: { title: string }) => (
  <h2 className="text-2xl font-semibold mb-4">{title}</h2>
);

const IconCardDescription = ({ children }: { children: React.ReactNode }) => (
  <p className="text-gray-400 text-sm text-left">
    {children}
  </p>
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
