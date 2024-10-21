import React from "react";
import { FiBox, FiFeather, FiLayers, FiUploadCloud } from "react-icons/fi";
import {
  IconCard,
  IconCardDescription,
  IconCardTitle,
} from "./components/IconCard";
import Link from "next/link";
import { Figtree } from "next/font/google";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Upload & View Exam Papers Easily
        </h1>
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">
          {`Our platform allows you to quickly upload and manage exam papers in a
          few simple steps. Whether you're a student or educator, you can upload
          exam papers and access them whenever needed.`}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <Link href="/upload">
            <IconCard>
              <FiUploadCloud className="text-rose-400 text-6xl mb-4" />
              <IconCardTitle title="Upload" />
              <IconCardDescription>
                Effortlessly upload your exam papers with just a click!
              </IconCardDescription>
            </IconCard>
          </Link>

          <Link href="/papers/cat1">
            <IconCard>
              <FiLayers className="text-indigo-400 text-6xl mb-4" />
              <IconCardTitle title="Cat1" />
              <IconCardDescription>
                Browse Past CAT1 Exam Papers
              </IconCardDescription>
            </IconCard>
          </Link>

          <Link href="/papers/cat2">
            <IconCard>
              <FiLayers className="text-green-400 text-6xl mb-4" />
              <IconCardTitle title="Cat2" />
              <IconCardDescription>
                Discover and Explore Past CAT2 Exam Papers
              </IconCardDescription>
            </IconCard>
          </Link>

          <Link href="/papers/fat">
            <IconCard>
              <FiFeather className="text-pink-400 text-6xl mb-4" />
              <IconCardTitle title="Fat" />
              <IconCardDescription>
                Dive into the Vault of Past FAT Exam Papers!
              </IconCardDescription>
            </IconCard>
          </Link>


          <Link href="/papers/cat">
            <IconCard>
              <FiBox className="text-cyan-400 text-6xl mb-4" />
              <IconCardTitle title="Cat" />
              <IconCardDescription>
                Look into the past CAT Exam Papers!
              </IconCardDescription>
            </IconCard>
          </Link>

        </div>
      </div>
    </div>
  );
}
