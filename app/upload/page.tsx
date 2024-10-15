"use client";

import ImageUpload from "app/components/imageUpload";
import { ChangeEvent, FormEvent, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormErrors,
  FormState,
  useUploadPaperForm,
} from "app/hooks/uploadPaperForm";
import { compressImages } from "app/utils/compressImage";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { AlertCircle, CalendarIcon } from "lucide-react";
import { useAuth } from "app/context/AuthContext";
import { ErrorMessage } from "app/components/ErrorMessage";
import { uploadAction } from "app/actions/saveUploadAction";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { uploadActionStates } from "../actions/actionStates";

import { getPDFFromImages } from "./toPDF";
import { uploadPDF } from "./uploadPDF";
import { User } from "firebase/auth";
import { FaCheck, FaHome, FaUpload } from "react-icons/fa";
import Link from "next/link";
import { LoadingCard } from "../components/LoadingCard";

type PageState = "edit" | "uploading" | "completed";

export default function Home() {
  const {
    formState,
    errors: formErrors,
    images,
    validateForm,
    setImages,
    setFormState,
  } = useUploadPaperForm();

  const { currentUser } = useAuth();
  const [pageState, setPageStage] = useState<PageState>("edit");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const _uploadFiles = async (user: User) => {
    const compressedImages: File[] = await compressImages(images);
    const pdfFile = await getPDFFromImages(compressedImages);
    const pdfURL = await uploadPDF(user.uid, pdfFile)

    const token = await user.getIdToken();
    return await uploadAction(formState, pdfURL, token);
  }

  const _handleSubmitWrapper = async (e: FormEvent): Promise<PageState> => {
    e.preventDefault();
    if (!validateForm()) return "edit";

    if (!currentUser) {
      alert("Please signin to continue");
      return "edit";
    }

    const res = await _uploadFiles(currentUser)

    if (res.state != uploadActionStates.success) {
      setSubmitError(res.state);
      return "edit";
    }
    return "completed";
  };

  const handleSubmit = async (e: FormEvent) => {
    setPageStage("uploading")
    try {
      const _pageState = await _handleSubmitWrapper(e)
      setPageStage(_pageState)
    } catch (e) {
      setPageStage("edit")
      console.error(e)
      setSubmitError("An error occured while uploading the exam paper.")
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <main>
      <div className="mx-auto mb-36 p-4 max-w-2xl">

        {pageState === "edit" && (
          <>
            <h1 className="mb-4 font-bold text-3xl text-gray-300">
              Upload Exam paper
            </h1>
            {(submitError != null) && (
              <Alert variant="destructive" className="my-4">
                <AlertCircle className="mr-2 w-4 h-4" />
                <AlertTitle>{submitError}</AlertTitle>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <ExamForm
                formState={formState}
                handleInputChange={handleInputChange}
                errors={formErrors}
              />
              <ImageUpload images={images} setImages={setImages} />
              <button className="bg-gray-800 dark:hover:bg-gray-200 hover:bg-gray-700 dark:bg-white px-4 py-2 rounded-lg font-medium text-sm text-white dark:hover:text-gray-500 hover:text-white dark:text-gray-800">
                Upload
              </button>
            </form>
          </>
        )}

        {pageState === "uploading" && (
          <LoadingCard />
        )}

        {pageState === "completed" && (
          <div
            className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6 mx-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Upload Complete</h2>
            </div>
            <div
              className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mx-auto mb-6"
            >
              <FaCheck size={40} className="text-green-600" />
            </div>
            <p className="text-center text-gray-300 mb-4">Your file has been successfully uploaded!</p>
            <div className="flex justify-center space-x-4">
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                onClick={() => window.location.reload()}
              >
                <div className="flex items-center gap-2" > <FaUpload />  Upload Another </div>
              </button>
              <Link href="/" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
                <div className="flex items-center gap-2" > <FaHome />  Go To Home </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

interface ExamFormProps {
  formState: FormState;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: FormErrors;
}

function ExamForm({ formState, handleInputChange, errors }: ExamFormProps) {
  const slots = [
    "A1",
    "A2",
    "B1",
    "B2",
    "C1",
    "C2",
    "D1",
    "D2",
    "E1",
    "E2",
    "F1",
    "F2",
    "G1",
    "G2",
  ];
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name" className="font-medium text-gray-300 text-sm">
          Name of the Exam
        </Label>
        <Input
          type="text"
          id="name"
          value={formState.name}
          onChange={handleInputChange}
          className="rounded-lg w-full text-sm"
          placeholder="Enter exam name"
        />
        <ErrorMessage>
          {errors.name}
        </ErrorMessage>
      </div>

      <div>
        <Label
          htmlFor="courseCode"
          className="font-medium text-gray-300 text-sm"
        >
          Course Code
        </Label>
        <Input
          type="text"
          id="courseCode"
          value={formState.courseCode}
          onChange={handleInputChange}
          className="rounded-lg w-full text-sm"
          placeholder="CSE3004"
          title="Course code should be in the format 'ABC1234'."
        />

        <ErrorMessage>
          {errors.courseCode}
        </ErrorMessage>
      </div>

      <div>
        <Label htmlFor="examType" className="font-medium text-gray-300 text-sm">
          Type of the Exam
        </Label>
        <Select
          onValueChange={(val) => {
            handleInputChange({
              target: {
                id: "examType",
                value: val,
              },
            } as ChangeEvent<HTMLInputElement>);
          }}
        >
          <SelectTrigger className="mt-2 w-full">
            <SelectValue placeholder="Select an Exam" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cat1">CAT1</SelectItem>
            <SelectItem value="cat2">CAT2</SelectItem>
            <SelectItem value="fat">FAT</SelectItem>
          </SelectContent>
        </Select>
        <ErrorMessage>
          {errors.examType}
        </ErrorMessage>
      </div>

      <div>
        <Label htmlFor="examSlot" className="font-medium text-gray-300 text-sm">
          Exam Slot
        </Label>
        {
          <Select
            onValueChange={(val) => {
              handleInputChange({
                target: {
                  id: "examSlot",
                  value: val,
                },
              } as ChangeEvent<HTMLInputElement>);
            }}
          >
            <SelectTrigger className="mt-2 mb-5 w-full">
              <SelectValue placeholder="Select an Exam Slot" />
            </SelectTrigger>
            <SelectContent>
              {slots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
        <ErrorMessage>
          {errors.examSlot}
        </ErrorMessage>
      </div>

      <div className="flex flex-col">
        <Label htmlFor="examType" className="font-medium text-gray-300 text-sm">
          Date of the Exam
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="justify-start font-normal text-left"
            >
              <CalendarIcon className="opacity-50 mr-3 w-4 h-4" />
              {formState.examDate
                ? (
                  format(formState.examDate, "PPP")
                )
                : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-auto" align="start">
            <Calendar
              mode="single"
              selected={formState.examDate ?? undefined}
              onSelect={(_, selectedDay) => {
                handleInputChange({
                  target: {
                    id: "examDate",
                    // @ts-ignore
                    value: selectedDay,
                  },
                });
              }}
              className="border rounded-md"
            />
          </PopoverContent>
        </Popover>

        <ErrorMessage>
          {errors.examDate}
        </ErrorMessage>
      </div>
    </div>
  );
}
