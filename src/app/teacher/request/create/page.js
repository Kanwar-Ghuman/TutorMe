"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  preferredTimesOptionsNew,
  tutorTypeOptions,
  subjectsOptions,
} from "@/components/utils/common";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button as NextUIButton,
  useDisclosure,
} from "@nextui-org/react";
import { FormDropDownInput } from "@/components/tutorme/inputs/FormDropDownInput";
import { FormDropDownInputWithIcons } from "@/components/tutorme/inputs/FormDropDownInputWithIcons";
import { FormInput } from "@/components/tutorme/inputs/FormInput";
import { FormMultiSelectInput } from "@/components/tutorme/inputs/FormMultiSelectInput";
import { FormTextarea } from "@/components/tutorme/inputs/FormTextarea";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { BsExclamationCircle } from "react-icons/bs";
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { createTutorRequestSchema } from "@/lib/forms/schemas";

const CreateRequest = () => {
  useEffect(() => {
    fetchTeacherProfile();
  }, []);

  const fetchTeacherProfile = async () => {
    try {
      const response = await fetch("/api/teacher/profile");
      if (response.ok) {
        const data = await response.json();
        if (data.classes) {
          const classes = JSON.parse(data.classes);
          setTeacherClasses(classes);

          // Filter subject options based on teacher's classes
          const filtered = subjectsOptions
            .map((group) => {
              const filteredOptions = group.options.filter((option) =>
                classes.includes(option.value)
              );
              return {
                ...group,
                options: filteredOptions,
              };
            })
            .filter((group) => group.options.length > 0);

          setFilteredSubjectOptions(filtered);
        }
      }
    } catch (err) {
      console.error("Error fetching teacher profile:", err);
    }
  };

  const defaultValues = {
    studentFirstName: "",
    studentLastName: "",
    studentEmail: "",
    subject: "",
    preferredTimes: [],
    description: "",
    tutorType: "",
  };

  const form = useForm({
    resolver: zodResolver(createTutorRequestSchema),
    defaultValues,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [filteredSubjectOptions, setFilteredSubjectOptions] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  async function onSubmit(data) {
    console.log("Form submitted with data:", data);
    setLoading(true);
    setError("");
    try {
      const formattedData = {
        ...data,
        studentName: `${data.studentFirstName} ${data.studentLastName}`,
        studentEmail: `${data.studentEmail}@franklinsabers.org`,
      };
      console.log("Formatted data:", formattedData);

      const response = await fetch("/api/teacher/create-tutor-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error:", errorData);
        throw new Error(errorData.message || "Request failed");
      }

      const responseData = await response.json();
      console.log("API response:", responseData);

      await fetch("/api/admin/auto-match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSuccess(true);
      setSubmittedData(formattedData);
      form.reset(defaultValues);
      onOpen();

      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Error details:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  const handleReturnToDashboard = () => {
    router.push("/teacher/tutor-requests");
  };

  return (
    <>
      <div className="flex items-center justify-center m-4 pt-8">
        <div className="w-full max-w-4xl">
          <h1 className="text-2xl mb-10">Request A Tutor</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={cn("space-y-6", {
                "opacity-50 pointer-events-none": loading,
              })}
            >
              {/* Row 1: First Name and Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  name="studentFirstName"
                  label="First Name"
                  placeholder="Alice"
                  form={form}
                  isRequired
                  disabled={loading}
                />
                <FormInput
                  name="studentLastName"
                  label="Last Name"
                  placeholder="Jones"
                  form={form}
                  isRequired
                  disabled={loading}
                />
              </div>

              {/* Row 2: Email and Subject */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  name="studentEmail"
                  label="Student Email Address (Enter the student's username only)"
                  placeholder="alice.jones"
                  form={form}
                  isRequired
                  disabled={loading}
                />
                <FormDropDownInputWithIcons
                  name="subject"
                  label="Subject"
                  options={filteredSubjectOptions}
                  form={form}
                  isRequired
                  disabled={loading}
                  placeholder="Select a subject..."
                />
              </div>

              {/* Row 3: Tutoring Type and Preferred Times */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormDropDownInput
                  name="tutorType"
                  label="Tutoring Type"
                  options={tutorTypeOptions}
                  form={form}
                  disabled={loading}
                />
                <FormMultiSelectInput
                  name="preferredTimes"
                  label="Preferred Times"
                  options={preferredTimesOptionsNew}
                  form={form}
                  disabled={loading}
                />
              </div>

              {/* Row 4: Description */}
              <FormTextarea
                name="description"
                label="Additional Description"
                placeholder="Please provide any additional details about the tutoring request, specific topics to focus on, student's learning style, etc."
                form={form}
                disabled={loading}
                rows={4}
              />

              {/* <FormDropDownInput
                name="genderPreference"
                label="Gender Preference"
                options={[
                  {
                    group: [
                      { value: "M", label: "Male" },
                      { value: "F", label: "Female" },
                      { value: "N", label: "No Preference" },
                    ],
                  },
                ]}
                form={form}
                description="Does your student prefer a certain tutor gender?"
                isRequired
                disabled={loading}
              /> */}
              <p
                className={cn("text-danger fill-danger", error ? "" : "hidden")}
              >
                <BsExclamationCircle />
                <span>{error}</span>
              </p>
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

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Request Successfully Made ✅
              </ModalHeader>
              <ModalBody>
                {submittedData && (
                  <>
                    <p>
                      <strong>Student Name:</strong> {submittedData.studentName}
                    </p>
                    <p>
                      <strong>Student Email:</strong>{" "}
                      {submittedData.studentEmail}
                    </p>
                    <p>
                      <strong>Subject:</strong> {submittedData.subject}
                    </p>
                    <p>
                      <strong>Preferred Times:</strong>{" "}
                      {submittedData.preferredTimes?.join(", ") ||
                        "None specified"}
                    </p>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <NextUIButton color="primary" onPress={handleReturnToDashboard}>
                  Return to Dashboard
                </NextUIButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateRequest;
