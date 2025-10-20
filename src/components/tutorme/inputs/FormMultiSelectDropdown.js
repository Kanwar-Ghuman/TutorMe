import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { customStyles, formatOptionLabel } from "@/components/utils/common";

const FormMultiSelectDropdown = ({
  form,
  name,
  label,
  options,
  description,
  isRequired = false,
  disabled = false,
}) => {
  // Transform the options to include icons
  const transformedOptions = options.map((group) => ({
    label: group.label,
    options: group.options || group.group,
  }));

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base">
            {label} {isRequired && <span className="text-red-500">*</span>}
          </FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
          <FormControl>
            <Controller
              name={name}
              control={form.control}
              render={({ field: { onChange, value } }) => (
                <ReactSelect
                  isMulti
                  options={transformedOptions}
                  value={value
                    ?.map((val) => {
                      // Find the option object for each selected value
                      for (const group of transformedOptions) {
                        const option = group.options.find(
                          (opt) => opt.value === val
                        );
                        if (option) return option;
                      }
                      return null;
                    })
                    .filter(Boolean)}
                  onChange={(selectedOptions) => {
                    onChange(
                      selectedOptions
                        ? selectedOptions.map((opt) => opt.value)
                        : []
                    );
                  }}
                  styles={customStyles}
                  formatOptionLabel={formatOptionLabel}
                  placeholder="Select classes..."
                  isDisabled={disabled}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { FormMultiSelectDropdown };
