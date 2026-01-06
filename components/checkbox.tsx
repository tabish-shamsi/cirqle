import { cn } from "@/lib/utils";
import { FormFieldWrapper } from "./form-field-wrapper";
import { Checkbox as ShadcnCheckbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Control, FieldValues, Path } from "react-hook-form";

type CheckboxProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  className?: string;
};

export default function Checkbox<T extends FieldValues>({
  control,
  name,
  label,
}: CheckboxProps<T>) {
  return (
    <FormFieldWrapper control={control} name={name}>
      {({ field, fieldState }) => (
        <div className="flex gap-2 items-center">
          <ShadcnCheckbox
            value={field.value}
            onCheckedChange={field.onChange}
            aria-invalid={fieldState.error ? "true" : "false"}
            id={name}
            name={name}
          />
          <Label
            htmlFor={name}
            className={cn(
              "text-sm text-muted-foreground font-normal",
              fieldState.error && "text-destructive",
            )}
          >
            {label}
          </Label>
        </div>
      )}
    </FormFieldWrapper>
  );
}
