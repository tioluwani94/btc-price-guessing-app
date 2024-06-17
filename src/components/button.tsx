"use client";

import { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, ...rest } = props;

  return (
    <button
      className={`h-[40px] w-full text-white px-4 rounded-md font-medium transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50 ${className}`}
      {...rest}
    />
  );
}
