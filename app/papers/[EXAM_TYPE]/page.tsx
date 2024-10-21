import { fetchAvailableCourseCodes } from "@/app/firebase/fetchData";
import { ExamType } from "@/app/data/ExamEntry";
import { CardsClient } from "./client";

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

  return <CardsClient cardsData={cardsData} EXAM_TYPE={EXAM_TYPE} />;
};


export default CardsPage;
