import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { FormFieldWrapper } from "./form-field-wrapper";
import { Control, FieldValues, Path } from "react-hook-form";

type InputOTPProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  length?: number;
  splitAt?: number;
};

export default function OTPInput<T extends FieldValues = FieldValues>({
  length = 6,
  splitAt = 3,
  control,
  name,
  label,
}: InputOTPProps<T>) {
  const slots = Array.from({ length }, (_, i) => i);
  return (
    <div className="space-y-3">
      <FormFieldWrapper control={control} name={name} label={label}>
        {({ field, fieldState }) => (
          <InputOTP {...field} maxLength={length}>
            <InputOTPGroup className="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
              {slots.slice(0, splitAt).map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  aria-invalid={!!fieldState.error}
                />
              ))}
            </InputOTPGroup>

            <InputOTPSeparator />

            <InputOTPGroup className="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
              {slots.slice(splitAt).map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  aria-invalid={!!fieldState.error}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        )}
      </FormFieldWrapper>
    </div>
  );
}
