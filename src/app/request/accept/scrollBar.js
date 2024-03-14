"use client"

import React, { useRef } from "react";
import AcceptStudentCard from './acceptStudentCard'
import './style.css'

function scrollbar() {
    let requestArray = [];
    for (let i = 0; i < 10; i++) {
        requestArray.push("student " + i);
    }

    // const [myvariable, zerio] = useState(true)
    const list = requestArray.map(() =>
        <div
        >
            <AcceptStudentCard />
        </div>
    )

    const cardsStyle = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: '0vh 0%',
        backgroundColor: 'transparent',
        // borderRadius: '10px',
        // overFlow: 'scroll'
    }
    const scrollBarWhole = {
        display: 'flex',
        width: '100%',
        margin: '0% 0%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        backgroundColor: 'transparent',
        // borderRadius: '10px'
        borderWidth: '0px 1px'
    }

    return (
        <div
            style={scrollBarWhole}
        >
            <input
                style={{ border: '2px solid black', borderRadius: '7px', textAlign: 'center', margin: '5vh' }}
                autoFocus
                type='text'
                placeholder='looking for someone ?'></input>
            <div
                className="overflow-y-scroll scroll whitespacer-nonwrap"
                style={cardsStyle}
            >
                {list}
            </div>
        </div>
    )
}

export default scrollbar;