import React from "react";

export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`border border-gray-300 rounded px-3 py-2 w-full text-sm ${className}`}
      {...props}
    />
  );
}
