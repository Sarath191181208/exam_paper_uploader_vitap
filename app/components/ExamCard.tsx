import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaCalendarAlt, FaCloudUploadAlt, FaDownload, FaUserClock } from "react-icons/fa";
import { ExamEntry } from "app/data/ExamEntry";

const ExamCard: React.FC<ExamEntry> = ({
  courseCode,
  examDate,
  examSlot,
  examType,
  pdfURL,
  name,
  uploadedDate,
  uploader,
}) => {
  const formattedDate = examDate.toDateString();
  const formattedUploadDate = new Date(uploadedDate).toDateString();

  return (
    <Card className="bg-gray-800 text-gray-200">
      <CardHeader className="space-y-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">{name}</CardTitle>
          <span className="text-sm font-bold text-gray-900 bg-gray-400 rounded-full px-3 py-1">
            {examSlot}
          </span>
        </div>
        <CardDescription className="text-gray-400">
          {courseCode} - {examType.toUpperCase()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <InfoItem icon={<FaCalendarAlt />} label="Exam Date" value={formattedDate} />
          <InfoItem icon={<FaCloudUploadAlt />} label="Uploaded" value={formattedUploadDate} />
          <InfoItem icon={<FaUserClock />} label="Uploader" value={uploader} />
        </div>
        <a
          href={pdfURL}
          download
          className="flex justify-center items-center gap-2 px-4 py-2 bg-gray-400 text-gray-900 font-semibold rounded-md hover:bg-gray-300 transition-colors"
        >
          <FaDownload className="h-5 w-5" />
          Download Exam File
        </a>
      </CardContent>
    </Card>
  );
};

const InfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2 text-sm">
    <span className="text-gray-400">{icon}</span>
    <span className="font-medium">{label}:</span>
    <p className="text-gray-300  truncate overflow-ellipsis overflow-hidden">{value}</p>
  </div>
);

export default ExamCard;
