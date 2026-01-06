"use client";

import { Input } from "./ui/input";
import { ReactNode } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { FormFieldWrapper } from "./form-field-wrapper";

type TInputWithIcon<T extends FieldValues = FieldValues> = {
  placeholder: string;
  icon: ReactNode;
  type?: string;
  className?: string;
  control: Control<T>;
  name: Path<T>;
  label?: string;
};

export default function InputWithIcon<T extends FieldValues = FieldValues>({
  placeholder,
  type,
  icon,
  control,
  name,
  label,
}: TInputWithIcon<T>) {
  return (
    <FormFieldWrapper control={control} name={name} label={label}>
      {({field, fieldState}) => (
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
            {icon}
          </div>

          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            className="peer pl-12 h-12"
            aria-invalid={fieldState.error ? "true" : "false"}
          />
        </div>
      )}
    </FormFieldWrapper>
  );
}
