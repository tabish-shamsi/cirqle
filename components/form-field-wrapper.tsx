import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";
import { ReactNode } from "react";

type FormFieldWrapperProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  className?: string; 
  children: (field: any) => ReactNode;
};

export function FormFieldWrapper<T extends FieldValues>({
  control,
  name,
  label,
  className,
  children,
}: FormFieldWrapperProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>{children({field, fieldState})}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
