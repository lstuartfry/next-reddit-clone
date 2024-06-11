"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";

type Props = {
  children: React.ReactNode;
};

export default function SubmitFormButton({ children }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending}>
      {children}
    </Button>
  );
}
