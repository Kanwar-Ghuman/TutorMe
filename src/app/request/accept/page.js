
import React from "react";
"use-client";

// import { Inter } from 'next/font/google'
// import { useState } from "react";

import Navbar from '@/components/tutorme/home/nav/navbar';
import SideBar from './sideBar';
import ScrollBar from './scrollBar';


const AcceptRequest = () => {
    // Your base page content goes here
    function mouseOver(event) {
        event.target.style.background = 'red';
    }

    // const myHeight = window.innerHeight * 0.5;
    return (
        <div
            // asChild
            style={{ height: '100vh' }}
            className='scroll-hide'
        >
            <Navbar />
            <div
                style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '90vh' }}
            >
                <SideBar />
                <ScrollBar />
            </div>

        </div>
    );
};

export default AcceptRequest;
