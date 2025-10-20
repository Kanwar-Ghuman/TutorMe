"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { subjectsOptions } from "@/components/utils/common";
import { FormMultiSelectDropdown } from "@/components/tutorme/inputs/FormMultiSelectDropdown";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { BsExclamationCircle } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useToast } from "@/hooks/use-toast";

const TeacherProfile = () => {
  const defaultValues = {
    classes: [],
  };

  const form = useForm({
    defaultValues,
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/teacher/profile");
      if (response.ok) {
        const data = await response.json();
        if (data.classes) {
          form.setValue("classes", JSON.parse(data.classes));
        }
        setIsFirstTime(!data.isProfileComplete);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setInitialLoading(false);
    }
  };

  async function onSubmit(data) {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/teacher/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classes: data.classes,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      setSuccess(true);
      toast({
        title: "Profile Updated",
        description: "Your class preferences have been saved successfully.",
      });

      if (isFirstTime) {
        setTimeout(() => {
          router.push("/teacher/tutor-requests");
        }, 2000);
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center m-4 pt-8">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-semibold">
              {isFirstTime ? "Welcome! Set Up Your Profile" : "Teacher Profile"}
            </h1>
          </CardHeader>
          <CardBody>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn("space-y-6", {
                  "opacity-50 pointer-events-none": loading,
                })}
              >
                <FormMultiSelectDropdown
                  name="classes"
                  label="Classes You Teach"
                  options={subjectsOptions}
                  form={form}
                  isRequired
                  disabled={loading}
                />

                {error && (
                  <p className="text-danger flex items-center gap-2">
                    <BsExclamationCircle />
                    <span>{error}</span>
                  </p>
                )}

                <div className="flex gap-4">
                  <Button
                    className={cn("flex-1", {
                      "bg-green-500": success,
                      "hover:bg-green-600": success,
                    })}
                    type="submit"
                    disabled={loading || success}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : success ? (
                      "Saved!"
                    ) : isFirstTime ? (
                      "Complete Setup"
                    ) : (
                      "Update Profile"
                    )}
                  </Button>

                  {!isFirstTime && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/teacher/tutor-requests")}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default TeacherProfile;
