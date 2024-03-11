import React from 'react';
import { Input } from "@/components/ui/input"

const CreateRequest = () => {
    // Your base page content goes here
    return (
        <>

            <div class="flex items-center justify-center m-4">
                <div className="w-1/2">
                    <h1 className="text-2xl mb-10">Request A Tutor</h1>
                    <Input className="mb-7" type="name" placeholder="Student Name" />
                    <Input className="mb-7" type="name" placeholder="Teacher Name" />
                </div>
            </div>
        </>
    );
};

export default CreateRequest;
