import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FaCalendarAlt, FaCloudUploadAlt, FaUserClock } from 'react-icons/fa'; 

interface ExamCardProps {
  courseCode: string;
  examDate: Date;
  examSlot: string;
  examType: string;
  imageURLs: string[];
  name: string;
  uploadedDate: Date;
  uploader: string;
}

const ExamCard: React.FC<ExamCardProps> = ({
  courseCode,
  examDate,
  examSlot,
  examType,
  imageURLs,
  name,
  uploadedDate,
  uploader,
}) => {
  const formattedDate = examDate.toDateString();
  
  return (
    <Card className="shadow-lg rounded-lg p-6 bg-gray-800 space-y-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-semibold text-gray-400">{name}</CardTitle>
          <span className="text-lg font-bold text-gray-900 bg-gray-400 rounded-full px-3 py-1">{examSlot}</span>
        </div>
        <CardDescription className="text-gray-400">
          {courseCode} - {examType.toUpperCase()}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex flex-col justify-between space-y-2">
            <div className="flex items-center text-gray-400">
              <FaCalendarAlt className="h-5 w-5 text-gray-400 mr-2" />
              <span className="font-medium">Exam Date: </span>
              <span className="ml-1">{formattedDate}</span>
            </div>

            <div className="flex items-center text-gray-400">
              <FaCloudUploadAlt className="h-5 w-5 text-gray-400 mr-2" />
              <span className="font-medium">Uploaded: </span>
              <span className="ml-1">{new Date(uploadedDate).toDateString()}</span>
            </div>

            <div className="flex items-center text-gray-400">
              <FaUserClock className="h-5 w-5 text-gray-400 mr-2" />
              <span className="font-medium">Uploader: </span>
              <span className="ml-1">{uploader}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamCard;
