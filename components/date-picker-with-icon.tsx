import { Control, FieldValues, Path } from "react-hook-form";
import { DatePicker } from "./date-picker";
import { FormFieldWrapper } from "./form-field-wrapper";
import { ReactNode } from "react";

type TDatePickerWithIcon<T extends FieldValues = FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  icon: ReactNode;
};

export default function DatePickerWithIcon<
  T extends FieldValues = FieldValues,
>({ control, name, label, icon }: TDatePickerWithIcon<T>) {
  return (
    <FormFieldWrapper control={control} name={name} label={label}>
      {({ field, fieldState }) => (
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
            {icon}
          </div>
          <DatePicker
            onChange={field.onChange}
            value={field.value}
            style={{ paddingLeft: "48px" }}
            ariaInvalid={!!fieldState.error}
          />
        </div>
      )}
    </FormFieldWrapper>
  );
}
