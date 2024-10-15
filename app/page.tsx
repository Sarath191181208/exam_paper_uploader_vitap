import React from "react";
import { FiFeather, FiLayers, FiUploadCloud } from "react-icons/fi";
import {
  IconCard,
  IconCardDescription,
  IconCardTitle,
} from "./components/IconCard";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Cats & Fat Cards
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/papers/cat1">
            <IconCard>
              <FiLayers className="text-indigo-400 text-6xl mb-4" />
              <IconCardTitle title="Cat1" />
              <IconCardDescription>
                This is the first cat card description.
              </IconCardDescription>
            </IconCard>
          </Link>

          <Link href="/papers/cat2">
            <IconCard>
              <FiLayers className="text-green-400 text-6xl mb-4" />
              <IconCardTitle title="Cat2" />
              <IconCardDescription>
                This is the second cat card description.
              </IconCardDescription>
            </IconCard>
          </Link>

          <Link href="/papers/fat">
            <IconCard>
              <FiFeather className="text-pink-400 text-6xl mb-4" />
              <IconCardTitle title="Fat" />
              <IconCardDescription>
                This is the fat card description
              </IconCardDescription>
            </IconCard>
          </Link>


          <Link href="/upload">
            <IconCard>
              <FiUploadCloud className="text-rose-400 text-6xl mb-4" />
              <IconCardTitle title="Upload" />
              <IconCardDescription>
                Upload your files easily with this card.
              </IconCardDescription>
            </IconCard>
          </Link>

        </div>
      </div>
    </div>
  );
}
