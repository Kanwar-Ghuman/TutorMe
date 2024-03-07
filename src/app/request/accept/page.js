'use-client'
import { Inter } from 'next/font/google'

import React from 'react';
import { Skeleton } from "@/components/ui/skeleton"
import Navbar from '@/components/tutorme/home/nav/navbar';
import AcceptStudentCard from './acceptStudentCard'
import SideBar from './sideBar';

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
            <div
                style={{ display: 'flex', flexDirection: 'row', height: '90%' }}
            >
                <SideBar />
                <AcceptStudentCard /><br />
            </div>

        </div>
    );
};

export default AcceptRequest;
