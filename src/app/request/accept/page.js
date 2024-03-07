'use-client'
import { Inter } from 'next/font/google'

import React from 'react';
import { Skeleton } from "@/components/ui/skeleton"
import Navbar from '@/components/tutorme/home/nav/navbar';
import AcceptStudentCard from './acceptStudentCard'
import sideBar from './sideBar';

const AcceptRequest = () => {
    // Your base page content goes here
    function mouseOver(event) {
        event.target.style.background = 'red';
    }
    return (
        <div
            asChild
            style={{ height: '100 vw' }}
        >
            <Navbar /><br />
            <sideBar />
            <AcceptStudentCard /><br />

        </div>
    );
};

export default AcceptRequest;
