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
      render={({ field }) => {
        const handleEmailInput = (e) => {
          if (name === "studentEmail" || name === "studentsEmail") {
            let value = e.target.value.replace(/@franklinsabers\.org$/, "");
            value = value.replace(/@/g, "");
            value = value.slice(0, 30);
            field.onChange(value);
            form.setValue(name, value);
          }
        };

        return (
          <FormItem>
            <FormLabel>
              {label} {requiredAsterik}
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  placeholder={
                    name === "studentEmail" || name === "studentsEmail"
                      ? "alice.jones"
                      : placeholder
                  }
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    name === "studentEmail" || name === "studentsEmail"
                      ? handleEmailInput(e)
                      : field.onChange(e);
                  }}
                  className={
                    name === "studentEmail" || name === "studentsEmail"
                      ? "pr-[165px]"
                      : ""
                  }
                />
                {(name === "studentEmail" || name === "studentsEmail") && (
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
        );
      }}
    />
  );
};

export { FormInput };
