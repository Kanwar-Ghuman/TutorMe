"use client"

import React, { useRef } from "react";
import AcceptStudentCard from '../../../components/tutorme/request/accept/acceptStudentCard'
import './style.css'

import { Input } from "@/components/ui/input";

function scrollbar() {
    let requestArray = [];
    for (let i = 0; i < 10; i++) {
        requestArray.push("student " + i);
    }

    return (
        <div className="h-adjusted-full">
            <Input type="text" placeholder="Filter" className="m-4 w-[80%]"/>
            <div
                className="flex flex-col overflow-auto max-h-[90%]"
            >
                {requestArray.map(() =>
                    <AcceptStudentCard />
                )}
            </div>
        </div>
    )
}

export default scrollbar;