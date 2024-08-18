"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button as NextUIButton,
  useDisclosure,
} from "@nextui-org/react";
s;
import { FormDropDownInput } from "@/components/tutorme/inputs/FormDropDownInput";
import { FormInput } from "@/components/tutorme/inputs/FormInput";
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
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/teacher/create-tutor-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const responseData = await response.json();
      console.log(responseData);

      setSuccess(true);
      setSubmittedData(data);
      form.reset(defaultValues);
      onOpen();

      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.log(err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  const handleReturnToDashboard = () => {
    router.push("/teacher/dashboard");
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
                placeholder="student@franklinsabers.org"
                description="Enter the student's email address"
                form={form}
                isRequired
                disabled={loading}
              />

              <FormDropDownInput
                name="subject"
                label="Subject"
                options={[
                  {
                    label: "Math",
                    group: [
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
                    group: [
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
                    group: [
                      { value: "Spanish 1", label: "Spanish 1" },
                      { value: "Spanish 2", label: "Spanish 2" },
                      { value: "Spanish 3", label: "Spanish 3" },
                      { value: "Spanish 4", label: "Spanish 4" },
                      { value: "Spanish 5", label: "Spanish 5" },
                    ],
                  },
                  {
                    label: "German",
                    group: [
                      { value: "German 1", label: "German 1" },
                      { value: "German 2", label: "German 2" },
                      { value: "German 3", label: "German 3" },
                      { value: "German 4", label: "German 4" },
                      { value: "German 5", label: "German 5" },
                    ],
                  },
                ]}
                form={form}
                description="What subject does your student need help with?"
                isRequired
                disabled={loading}
              />
              <FormDropDownInput
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
              />
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
                      <strong>Gender Preference:</strong>{" "}
                      {submittedData.genderPreference}
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
