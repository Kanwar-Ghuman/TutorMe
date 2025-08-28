import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

const FormMultiSelectInput = ({
  form,
  name,
  label,
  options,
  description,
  requiredAsterik = null,
  disabled = false,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">
              {label} {requiredAsterik}
            </FormLabel>
            {description && (
              <FormDescription>
                {description}
              </FormDescription>
            )}
          </div>
          <div className="grid grid-cols-1 gap-3">
            {options[0].group.map((item) => (
              <FormField
                key={item.value}
                control={form.control}
                name={name}
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.value}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.value)}
                          onCheckedChange={(checked) => {
                            const currentValue = field.value || [];
                            if (checked) {
                              field.onChange([...currentValue, item.value]);
                            } else {
                              field.onChange(
                                currentValue.filter((value) => value !== item.value)
                              );
                            }
                          }}
                          disabled={disabled}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { FormMultiSelectInput };
