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
  const handleEmailInput = (e) => {
    if (name === "studentsEmail") {
      let value = e.target.value.replace(/@franklinsabers\.org$/, "");
      value = value.replace(/@/g, "");
      form.setValue(name, value);
    }
  };

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
            <div className="relative">
              <Input
                placeholder={
                  name === "studentsEmail" ? "alice.jones" : placeholder
                }
                {...field}
                onChange={(e) => {
                  name === "studentsEmail"
                    ? handleEmailInput(e)
                    : field.onChange(e);
                }}
                className={name === "studentsEmail" ? "pr-[50px]" : ""}
              />
              {name === "studentsEmail" && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                  @franklinsabers.org
                </span>
              )}
            </div>
          </FormControl>
          {field.name in form.formState.errors ? (
            <FormMessage />
          ) : (
            <FormDescription>
              {name === "studentsEmail"
                ? "Enter the student's username only"
                : description}
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
};

export { FormInput };
