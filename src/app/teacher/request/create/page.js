"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  formSubjectsOptions,
  gradeLevelOptions,
  goldBlockOptions,
  tutorTypeOptions,
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
  const defaultValues = {
    studentName: "",
    studentEmail: "",
    subject: "",
    genderPreference: "",
    preferredGoldBlocks: [],
    gradeLevel: "",
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  async function onSubmit(data) {
    console.log("Form submitted with data:", data);
    setLoading(true);
    setError("");
    try {
      const formattedData = {
        ...data,
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
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl mb-10">Request A Tutor</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={cn("space-y-8", {
                "opacity-50 pointer-events-none": loading,
              })}
            >
              <FormInput
                name="studentName"
                label="Student Name"
                placeholder="Alice Jones"
                description="Use the format 'First Last' (e.g. 'Alice Jones')"
                form={form}
                isRequired
                disabled={loading}
              />
              <FormInput
                name="studentEmail"
                label="Student Email Address"
                placeholder="alice.jones"
                description="Enter the student's username only"
                form={form}
                isRequired
                disabled={loading}
              />

              <FormDropDownInput
                name="subject"
                label="Subject"
                options={formSubjectsOptions}
                form={form}
                description="What subject does your student need help with?"
                isRequired
                disabled={loading}
              />

              <FormDropDownInput
                name="gradeLevel"
                label="Grade Level"
                options={gradeLevelOptions}
                form={form}
                description="What grade level is the student?"
                disabled={loading}
              />

              <FormMultiSelectInput
                name="preferredGoldBlocks"
                label="Preferred Gold Block Days"
                options={goldBlockOptions}
                form={form}
                description="Select which gold block days work for tutoring sessions"
                disabled={loading}
              />

              <FormDropDownInput
                name="tutorType"
                label="Tutoring Type"
                options={tutorTypeOptions}
                form={form}
                description="Choose the type of tutoring arrangement"
                disabled={loading}
              />

              <FormTextarea
                name="description"
                label="Additional Description"
                placeholder="Please provide any additional details about the tutoring request, specific topics to focus on, student's learning style, etc."
                description="Help us find the best tutor by providing more context about the student's needs"
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
