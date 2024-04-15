import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormInput = ({
  form,
  name,
  label,
  placeholder,
  description,
  isRequired,
  ...props
}) => {
  const requiredAsterik = isRequired ? (
    <span className="text-destructive">*</span>
  ) : (
    ""
  );

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {requiredAsterik}
          </FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          {field.name in form.formState.errors ? (
            <FormMessage />
          ) : (
            <FormDescription>{description}</FormDescription>
          )}
        </FormItem>
      )}
    />
  );
};

export { FormInput };
