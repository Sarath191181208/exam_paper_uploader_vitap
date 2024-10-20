import { Button } from "@/components/ui/button";
import React from "react";

interface IconCardButtonProps {
  children: React.ReactNode;
}

export const IconCardButton: React.FC<IconCardButtonProps> = (
  { children },
) => {
  return (
    <Button className="mt-auto hover:bg-gray-900" variant="outline">
      {children}
    </Button>
  );
};

// IconCardTitle Component
interface IconCardTitleProps {
  title: string;
}

export const IconCardTitle: React.FC<IconCardTitleProps> = ({ title }) => {
  return <h2 className="text-2xl font-semibold mb-4">{title}</h2>;
};

// IconCardDescription Component
interface IconCardDescriptionProps {
 children: string;
}

export const IconCardDescription: React.FC<IconCardDescriptionProps> = (
  { children },
) => {
  return <p className="text-gray-400 mb-4">{children}</p>;
};

interface IconCardProps {
  className?: string;
  children: React.ReactNode;
}

export const IconCard: React.FC<IconCardProps> = ({ children, className}) => {
  return (
    <div className={"bg-gray-800 rounded-lg shadow-lg p-6 hover:scale-105 transition-all flex flex-col items-center text-center h-full " + className}>
      {children}
    </div>
  );
};
