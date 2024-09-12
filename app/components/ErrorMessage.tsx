import React from 'react';

interface ErrorMessageProps {
  children: React.ReactNode;
}

export function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <>
      {children && (
        <p className="mt-1 text-red-500 text-sm">{children}</p>
      )}
    </>
  );
}
