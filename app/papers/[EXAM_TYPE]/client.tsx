"use client";

import React, { useState, useEffect } from "react";
import { NotebookPen } from "lucide-react";
import { ExamType } from "@/app/data/ExamEntry";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";

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
    const filteredData = Object.keys(cardsData).filter((key) =>
      key.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCardsData(filteredData);
  }, [searchTerm, cardsData]);

  return (
    <div className="p-8">
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
          filteredCardsData.map((key: string) => (
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

const SubjectCard = (
  { children, className }: { children: React.ReactNode; className: string },
) => (
  <div
    className={`bg-gray-800 rounded-lg shadow-lg p-6 hover:scale-105 transition-all text-center ${className}`}
  >
    {children}
  </div>
);
