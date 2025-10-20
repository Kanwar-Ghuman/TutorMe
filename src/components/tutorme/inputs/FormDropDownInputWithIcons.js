"use client";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import ReactSelect from "react-select";
import { customStyles, formatOptionLabel } from "@/components/utils/common";
import { Controller } from "react-hook-form";

export function FormDropDownInputWithIcons(props) {
  const requiredAsterik = props.isRequired ? (
    <span className="text-destructive">*</span>
  ) : (
    ""
  );

  // Transform options if they have the old structure
  const transformedOptions = props.options.map((group) => ({
    label: group.label,
    options: group.options || group.group,
  }));

  return (
    <FormField
      {...props}
      control={props.form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {props.label} {requiredAsterik}
          </FormLabel>
          <FormControl>
            <Controller
              name={props.name}
              control={props.form.control}
              render={({ field: { onChange, value } }) => (
                <ReactSelect
                  options={transformedOptions}
                  value={transformedOptions
                    .flatMap((g) => g.options)
                    .find((opt) => opt.value === value)}
                  onChange={(option) => onChange(option?.value || "")}
                  styles={customStyles}
                  formatOptionLabel={formatOptionLabel}
                  placeholder={props.placeholder || "Select..."}
                  isDisabled={props.disabled}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  isClearable={!props.isRequired}
                />
              )}
            />
          </FormControl>
          {field.name in props.form.formState.errors ? (
            <FormMessage />
          ) : props.description ? (
            <FormDescription>{props.description}</FormDescription>
          ) : null}
        </FormItem>
      )}
    />
  );
}
