import { ReactNode } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

import { Form as ShadcnForm } from "@/components/ui/form";

export default function Form<T extends FieldValues>({
  form,
  children,
  onSubmit,
}: {
  form: UseFormReturn<T, any, T>;
  children: ReactNode;
  onSubmit: (values: T) => void;
}) {
  return (
    <ShadcnForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </ShadcnForm>
  );
}
