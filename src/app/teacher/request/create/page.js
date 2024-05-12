"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { FormDropDownInput } from "@/components/tutorme/inputs/FormDropDownInput"
import { FormInput } from "@/components/tutorme/inputs/FormInput"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { BsExclamationCircle } from "react-icons/bs";

import { createTutorRequestSchema } from "@/lib/forms/schemas";
import { cn } from "@/lib/utils"

const CreateRequest = () => {
    // Your base page content goes here3
    
    const form = useForm({
        // resolver: zodResolver(createTutorRequestSchema),
    })

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function onSubmit(data) {
        setLoading(true);
        setError("");
        // TODO: Send the fetch request to the backend
        const response = await fetch('/api/teacher/create-tutor-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            // Request succeeded, handle the response
            const responseData = await response.json();
            console.log(responseData);
        } else {
            // Request failed, handle the error
            // create zod error and display it
            const errors = await response.json()
            console.log(errors.error);
            setError(JSON.stringify(errors.error));

        }
    }
    return (
        <>
            <div class="flex items-center justify-center m-4 pt-8">
                <div className="w-full md:w-1/2">
                    <h1 className="text-2xl mb-10">Request A Tutor</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormInput
                                name="studentName"
                                label="Student Name"
                                placeholder="Alice Jones"
                                description="Use the format 'First Last' (e.g. 'Alice Jones')"
                                form={form}
                                isRequired
                            />
                            <FormInput
                                name="studentEmail"
                                label="Student Email Address"
                                placeholder="student@franklinsabers.org"
                                description="Enter the student's email address"
                                form={form}
                                isRequired
                            />

                            <FormDropDownInput
                                name="subject"
                                label="Subject"
                                options={[
                                    {
                                        "label": "Math", "group": [
                                            { "value": "IM1", "label": "IM1" },
                                            { "value": "IM2", "label": "IM2" },
                                            { "value": "IM3", "label": "IM3" },
                                            { "value": "Precalc", "label": "Precalculus" },
                                            { "value": "CalcAB", "label": "AP Calculus AB" },
                                            { "value": "CalcBC", "label": "AP Calculus BC" }
                                        ]
                                    },
                                    {
                                        "label": "Science", "group": [
                                            { "value": "Physics", "label": "Physics" },
                                            { "value": "Chemistry", "label": "Chemistry" },
                                            { "value": "Biology", "label": "Biology" },
                                            { "value": "APPhysics", "label": "AP Physics" },
                                            { "value": "APChemistry", "label": "AP Chemistry" },
                                            { "value": "APBiology", "label": "AP Biology" }
                                        ]
                                    },
                                    {
                                        "label": "Spanish", "group": [
                                            { "value": "Spanish1", "label": "Spanish 1" },
                                            { "value": "Spanish2", "label": "Spanish 2" },
                                            { "value": "Spanish3", "label": "Spanish 3" },
                                            { "value": "Spanish4", "label": "Spanish 4" },
                                            { "value": "Spanish5", "label": "Spanish 5" },
                                        ]
                                    },
                                    {
                                        "label": "German", "group": [
                                            { "value": "German1", "label": "German 1" },
                                            { "value": "German2", "label": "German 2" },
                                            { "value": "German3", "label": "German 3" },
                                            { "value": "German4", "label": "German 4" },
                                            { "value": "German5", "label": "German 5" }
                                        ]
                                    }
                                ]}
                                form={form}
                                description="What subject does your student need help with?"
                                isRequired
                            />
                            <FormDropDownInput
                                name="genderPreference"
                                label="Gender Preference"
                                options={[{ "group": [{ "value": "M", "label": "Male" }, { "value": "F", "label": "Female" }, { "value": "N", "label": "No Preference" }] }]}
                                form={form}
                                description="Does your student prefer a certain tutor gender?"
                                isRequired
                            />
                            <p className={cn("text-danger fill-danger", error ? "" : "hidden")}><BsExclamationCircle /><span>{error}</span></p>
                            <Button className="w-full mb-7" type="submit" isLoading={loading}>Submit</Button>
                        </form>
                    </Form>



                </div>
            </div>
        </>
    );
};

export default CreateRequest;
