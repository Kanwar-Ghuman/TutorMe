'use client'

import React from "react";
import { useState } from 'react';


const sideBar = () => {

    const sideBarStyle = (p) => ({
        backgroundColor: 'transparent',
        margin: "0% 0%",
        borderWidth: '1px',
        width: '20%',
        height: '90vh',
    })
    return (
        <div
            style={sideBarStyle('p')}
        >
            <button>olnoi</button>
            <button></button>
            <button></button>
            <button></button>
            <button></button>
        </div>
    )
}

export default sideBar;
