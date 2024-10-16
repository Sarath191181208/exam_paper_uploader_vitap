import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"
import { FaUpload } from "react-icons/fa"

export function UploadLoadingCard() {

  const [uploadProgress, setUploadProgress] = useState(10)

  const progressToText : {[key: number]: string}  = {
    0: "Starting upload...",
    10: "Initializing upload...",
    20: "Preparing files...",
    30: "Uploading file...",
    40: "File upload in progress...",
    50: "Halfway there...",
    60: "Uploading in progress...",
    70: "Almost done...",
    80: "Finalizing upload...",
    90: "Almost there, Finalizing a few things ....",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return prevProgress + 10
      })
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return <div
    className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6"
  >
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold ">
        <div className="flex items-center gap-2">
          Uploading File
          <FaUpload className="" />
        </div>
      </h2>
    </div>
    <div className="mb-4">
      <Progress value={uploadProgress} className="dark w-full" />
    </div>
    <div
      className="mt-6 flex items-center justify-center rounded-full mx-auto"
    >
      { progressToText[uploadProgress] }
    </div>
  </div>
}
