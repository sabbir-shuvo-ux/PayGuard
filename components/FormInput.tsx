import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type FormItemType<TSchema extends FieldValues> = {
  name: Path<TSchema>;
  form: UseFormReturn<TSchema>;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder: string;
  labelClassName?: string;
};

export const FormInput = <TSchema extends Record<string, any>>({
  form,
  name,
  label,
  type = "text",
  placeholder,
  labelClassName,
}: FormItemType<TSchema>) => {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem className="my-2">
          {label && <FormLabel className={labelClassName}>{label}</FormLabel>}
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              value={
                typeof field.value === "boolean"
                  ? String(field.value)
                  : field.value
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
