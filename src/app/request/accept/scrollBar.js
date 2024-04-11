"use client"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import React, { useState } from "react";
import AcceptStudentCard from '../../../components/tutorme/request/accept/acceptStudentCard'
import './style.css'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { HiOutlineArrowsUpDown } from "react-icons/hi2"

function scrollbar() {
    const defStudentArr = []
    for (let i = 1; i <= 10; i++) {
        let arr = ['student ' + i, 'tutor ' + i, i];
        defStudentArr.push(arr);
    }

    let [updateArr, setUpdateArr] = useState(defStudentArr);
    let [listStudent, setListStudent] = useState(
        updateArr.map((student) =>
            <>
                {/* <>{console.log(student)}</> */}
                <AcceptStudentCard studentName={student[0]} tutorName={student[1]} key={student[3]} />
            </>

        )
    )

    let [isReversed, setIsReversed] = useState(false)

    const reverseStudent = () => {
        setIsReversed(!isReversed);
        display(updateArr, !isReversed);
    }

    const search = (value) => {
        let returnArr = [];
        for (let i = 0; i < defStudentArr.length; i++) {
            if (innerSearch(defStudentArr[i], value) == true) {
                returnArr.push(defStudentArr[i])
            }
        }
        setUpdateArr(returnArr)
        display(returnArr, isReversed);
    }

    const innerSearch = (arr, value) => {
        for (let i = 0; i < (arr.length - 1); i++) {
            if (stringSearch(arr[i], value) == true) {
                return true;
            }
        }
        return false;
    }

    const stringSearch = (str, value) => {
        if (str.indexOf(value) >= 0) {
            return true;
        }
        return false
    }

    const display = (returnArr, reverse) => {
        let myTempArr = JSON.parse(JSON.stringify(returnArr))
        if (reverse) {
            myTempArr.reverse()
        }
        setListStudent(myTempArr.map((student) =>
            <>
                {/* <>{console.log(student)}</> */}
                <AcceptStudentCard studentName={student[0]} tutorName={student[1]} key={student[3]} />
            </>
        )
        )
    }

    return (
        <div className="h-[87vh]">
            <div
                className="flex flex-row m-4 justify-between items-center"
            >
                <Input type="text" id="inputSearch" placeholder="Filter" className="w-[80%]" onKeyUp={(event) => { search(event.target.value) }} />
                <div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">Filter</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="grid gap-4">
                                first name
                            </div>
                            <div className="grid gap-4">
                                last name
                            </div>
                            <div className="grid gap-4">
                                student id
                            </div>
                        </PopoverContent>

                    </Popover>
                    <Button variant="outline" type="button" onClick={reverseStudent}>
                        <HiOutlineArrowsUpDown />
                    </Button>
                </div>

            </div>
            <div
                className="flex flex-col overflow-auto max-h-[90%]"
            >
                {/* student is studentArr[index] */}
                {listStudent}
            </div>
        </div>
    )
}

export default scrollbar;