"use client";

import ImageUpload from "./components/imageUpload";
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
} from "./hooks/uploadPaperForm";
import { compressImages } from "./utils/compressImage";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

export default function Home() {
  const {
    formState,
    errors,
    images,
    validateForm,
    setImages,
    setFormState,
  } = useUploadPaperForm();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const compressedImages = compressImages(images);
    // upload the compressed images
    // and formState to the server
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <main>
      <div className="p-4 max-w-2xl mx-auto mb-36">
        <h1 className="text-3xl font-bold text-gray-300 mb-4">
          Upload Exam paper
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <ExamForm
            formState={formState}
            handleInputChange={handleInputChange}
            errors={errors}
          />
          <ImageUpload images={images} setImages={setImages} />
          <button className="rounded-lg px-4 py-2 font-medium text-sm 
                  dark:hover:bg-gray-200 dark:hover:text-gray-500 dark:text-gray-800 dark:bg-white 
                  bg-gray-800 text-white hover:bg-gray-700 hover:text-white
            ">
            Upload
          </button>
        </form>
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
        <Label htmlFor="name" className="text-sm font-medium text-gray-300">
          Name of the Exam
        </Label>
        <Input
          type="text"
          id="name"
          value={formState.name}
          onChange={handleInputChange}
          className="text-sm rounded-lg w-full"
          placeholder="Enter exam name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <Label
          htmlFor="courseCode"
          className="text-sm font-medium text-gray-300"
        >
          Course Code
        </Label>
        <Input
          type="text"
          id="courseCode"
          value={formState.courseCode}
          onChange={handleInputChange}
          className="text-sm rounded-lg w-full"
          placeholder="CSE3004"
          title="Course code should be in the format 'ABC1234'."
        />
        {errors.courseCode && (
          <p className="text-red-500 text-sm mt-1">{errors.courseCode}</p>
        )}
      </div>

      <div>
        <Label htmlFor="examType" className="text-sm font-medium text-gray-300">
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
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select an Exam" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cat1">CAT1</SelectItem>
            <SelectItem value="cat2">CAT2</SelectItem>
            <SelectItem value="fat">FAT</SelectItem>
          </SelectContent>
        </Select>
        {errors.examType && (
          <p className="text-red-500 text-sm mt-1">{errors.examType}</p>
        )}
      </div>

      <div>
        <Label htmlFor="examSlot" className="text-sm font-medium text-gray-300">
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
            <SelectTrigger className="w-full mt-2 mb-5">
              <SelectValue placeholder="Select an Exam Slot" />
            </SelectTrigger>
            <SelectContent>
              {slots.map((slot) => (
                <SelectItem
                  key={slot}
                  value={slot}
                >
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
        {errors.examSlot && (
          <p className="text-red-500 text-sm mt-1">{errors.examSlot}</p>
        )}
      </div>

      <div className="flex flex-col">
        <Label htmlFor="examType" className="text-sm font-medium text-gray-300">
          Date of the Exam
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="text-left font-normal justify-start"
            >
              <CalendarIcon className="h-4 w-4 opacity-50 mr-3" />
              {formState.examDate
                ? (
                  format(formState.examDate, "PPP")
                )
                : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={formState.examDate ?? undefined}
              onSelect={(day, selectedDay) => {
                handleInputChange({
                  target: {
                    id: "examDate",
                    value: selectedDay,
                  },
                });
              }}
              className="rounded-md border"
            />
          </PopoverContent>
        </Popover>
      </div>

      {errors.examDate && (
        <p className="text-red-500 text-sm mt-1">{errors.examSlot}</p>
      )}
    </div>
  );
}
