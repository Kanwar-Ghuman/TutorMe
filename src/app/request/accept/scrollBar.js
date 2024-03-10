"use client"

import React, { useRef } from "react";
import AcceptStudentCard from './acceptStudentCard'

function scrollbar(){
    let requestArray = [];
    for (let i = 0; i < 10; i ++){
        requestArray.push("student " + i);
    }

    // const [myvariable, zerio] = useState(true)
    const list = requestArray.map(() => 
    <AcceptStudentCard/>
    )

    const cardsStyle = {
        width:'80%',
        height:'80%',
        display: 'flex',
        flexDirection:'column',
        margin:'2% 0%',
        backgroundColor:'beige',
        borderRadius: '10px',
        overFlow: 'scroll' 
    }
    const scrollBarWhole = {
        display:'flex',
        height: '80%',
        width:'80%' , 
        margin: '5% 0%', 
        display:'flex', 
        flexDirection:'column', 
        justifyContent:'center', 
        alignItems:'center',
        backgroundColor:'green',
        borderRadius: '10px'
    }

    return (
        <div
        style={{width:'100%', height: '100%', display:'flex', justifyContent:'center',alignItems:'center', backgroundColor:'transparent'}}
        >
            <div
            style={scrollBarWhole}
            >
                <input 
                style={{border:'2px solid black', borderRadius:'7px', textAlign: 'center', margin:'auto 0%'}}
                type = 'text'
                placeholder='looking for someone ?'></input>
                <div 
                style={cardsStyle}
                className="overflow-y-scroll scroll whitespacer-nonwrap"
                >
                    {list}
                </div>
            </div>
        </div>
    )
}

export default scrollbar;