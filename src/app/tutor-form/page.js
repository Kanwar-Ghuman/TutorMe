"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Loader2 } from "lucide-react";
import Select from "react-select";
import { FormInput } from "@/components/tutorme/inputs/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { BsExclamationCircle } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTutorSchemaReal } from "@/lib/forms/schemas";
import {
  subjectsOptions,
  customStyles,
  formatOptionLabel,
} from "@/components/utils/common";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const TutorApplicationForm = () => {
  const router = useRouter();
  const defaultValues = {
    studentsName: "",
    studentsEmail: "",
    studentsSubjects: [],
  };

  const form = useForm({
    resolver: zodResolver(createTutorSchemaReal),
    defaultValues,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  async function onSubmit(data) {
    setLoading(true);
    setError("");

    const formattedData = [
      {
        name: data.studentsName,
        email: `${data.studentsEmail}@franklinsabers.org`,
        subjects: data.studentsSubjects.map((subject) => subject.value),
      },
    ];

    try {
      const response = await fetch("/api/public/tutor-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errors = await response.json();
        setError(JSON.stringify(errors.error));
        return;
      }

      router.push("/tutor-form/success");
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center m-4 pt-8">
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl mb-10">Tutor Interest</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("space-y-8", {
              "opacity-50 pointer-events-none": loading,
            })}
          >
            <FormInput
              name="studentsName"
              label="Your Name"
              placeholder="Alice Jones"
              description="Use the format 'First Last' (e.g. 'Alice Jones')"
              form={form}
              isRequired
              disabled={loading}
            />
            <FormInput
              name="studentsEmail"
              label="Your School Email"
              placeholder="alice.jones"
              description="Enter only your username (without @franklinsabers.org)"
              form={form}
              isRequired
              disabled={loading}
            />

            <Controller
              name="studentsSubjects"
              control={form.control}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subjects You Can Tutor
                  </label>
                  <Select
                    {...field}
                    isMulti
                    options={subjectsOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Select subjects"
                    isDisabled={loading}
                    styles={customStyles}
                    formatOptionLabel={formatOptionLabel}
                  />
                  {form.formState.errors.studentsSubjects && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.studentsSubjects.message}
                    </p>
                  )}
                </div>
              )}
            />

            {error && (
              <p className="text-red-500 flex items-center gap-2">
                <BsExclamationCircle />
                <span>{error}</span>
              </p>
            )}

            <Button
              className={cn("w-full mb-7", {
                "bg-green-500": success,
                "hover:bg-green-600": success,
              })}
              type="submit"
              disabled={loading || success}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting ...
                </>
              ) : success ? (
                "Application Submitted!"
              ) : (
                "Submit Application"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default TutorApplicationForm;
