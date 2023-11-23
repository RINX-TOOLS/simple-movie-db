"use client";

import { useFormStatus } from "react-dom";
import { LuLoader2 } from "react-icons/lu";

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className={`inline-flex gap-1 items-center ${pending && "text-blue-500"}`}
    >
      {children}
      <span className={`${pending ? "flex animate-spin" : "hidden"}`}>
        <LuLoader2 />
      </span>
    </button>
  );
}
