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

const TutorRequest = () => {
  const defaultValues = {
    studentsName: "",
    studentsEmail: "",
    studenstSubjects: [],
  };

  const form = useForm({
    resolver: zodResolver(createTutorSchemaReal),
    defaultValues,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const subjectsOptions = [
    {
      label: "Math",
      options: [
        { value: "IM1", label: "IM1" },
        { value: "IM2", label: "IM2" },
        { value: "IM3", label: "IM3" },
        { value: "Precalc", label: "Precalculus" },
        { value: "Calc AB", label: "AP Calculus AB" },
        { value: "Calc BC", label: "AP Calculus BC" },
      ],
    },
    {
      label: "Science",
      options: [
        { value: "Physics", label: "Physics" },
        { value: "Chemistry", label: "Chemistry" },
        { value: "Biology", label: "Biology" },
        { value: "AP Physics", label: "AP Physics" },
        { value: "AP Chemistry", label: "AP Chemistry" },
        { value: "AP Biology", label: "AP Biology" },
      ],
    },
    {
      label: "Spanish",
      options: [
        { value: "Spanish 1", label: "Spanish 1" },
        { value: "Spanish 2", label: "Spanish 2" },
        { value: "Spanish 3", label: "Spanish 3" },
        { value: "Spanish 4", label: "Spanish 4" },
        { value: "Spanish 5", label: "Spanish 5" },
      ],
    },
    {
      label: "German",
      options: [
        { value: "German 1", label: "German 1" },
        { value: "German 2", label: "German 2" },
        { value: "German 3", label: "German 3" },
        { value: "German 4", label: "German 4" },
        { value: "German 5", label: "German 5" },
      ],
    },
  ];

  async function onSubmit(data) {
    setLoading(true);
    setError("");

    const formattedData = [
      {
        name: data.studentsName,
        email: data.studentsEmail,
        subjects: data.studentsSubjects.map((subject) => subject.value),
      },
    ];

    console.log(formattedData);

    try {
      const response = await fetch("/api/admin/tutors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errors = await response.json();
        // Convert the error object to a string
        setError(JSON.stringify(errors.error));
        return;
      }

      const responseData = await response.json();
      setSuccess(true);
      form.reset(defaultValues);

      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center m-4 pt-8">
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl mb-10">Add A Tutor</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={cn("space-y-8", {
                "opacity-50 pointer-events-none": loading,
              })}
            >
              <FormInput
                name="studentsName"
                label="Student Name"
                placeholder="Alice Jones"
                description="Use the format 'First Last' (e.g. 'Alice Jones')"
                form={form}
                isRequired
                disabled={loading}
              />
              <FormInput
                name="studentsEmail"
                label="Student Email Address"
                placeholder="student@franklinsabers.org"
                description="Enter the student's email address"
                form={form}
                isRequired
                disabled={loading}
              />

              <Controller
                name="studentsSubjects"
                control={form.control}
                render={({ field }) => (
                  <div>
                    <Select
                      {...field}
                      isMulti
                      options={subjectsOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      placeholder="Select subjects"
                      isDisabled={loading}
                    />
                    {form.formState.errors.studentsSubjects && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.studentsSubjects.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <p
                className={cn("text-danger fill-danger", error ? "" : "hidden")}
              >
                <BsExclamationCircle />
                <span>
                  {typeof error === "string" ? error : JSON.stringify(error)}
                </span>
              </p>
              <Button
                className={cn("w-full mb-7", {
                  "bg-green-300": success,
                  "hover:bg-green-200": success,
                })}
                type="submit"
                disabled={loading || success}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : success ? (
                  "Success"
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default TutorRequest;
