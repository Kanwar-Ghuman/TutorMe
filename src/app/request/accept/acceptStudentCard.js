'use client'
import React, { useState } from 'react';


function student() {
    let studentName = 'John';
    let tutorName = "Steve"
    const [isHoveredAccept, setIsHoveredAccept] = useState(false);
    const [isHoveredDecline, setIsHoveredDecline] = useState(false);

    const cardStyle = {
        display: 'flex',
        width: '95%',
        innerHeight: '20%',
        backgroundColor: '#C7F5D3',
        margin: '1% auto',
        borderRadius: '10px 10px',
        border: '1px solid black',
        // boxShadow: '1px 1px 2px 1px black'
    }

    let acceptStyle = (color) => ({
        // width: '40%',
        backgroundColor: color,
        filter: isHoveredAccept ? 'brightness(95%)' : 'brightness(80%)',
        borderLine: 'black',
        borderRadius: '5px 5px',
        borderLine: 'black',
        boxShadow: '1px 1px 2px 1px black',
        // fontSize: 'fit-content',
        width: '40%'
    })

    let declineStyle = (color) => ({
        // width: '40%',
        backgroundColor: color,
        filter: isHoveredDecline ? 'brightness(95%)' : 'brightness(80%)',
        borderLine: 'black',
        borderRadius: '5px 5px',
        borderLine: 'black',
        boxShadow: '1px 1px 2px 1px black',
        width: '40%'

    })

    const handleMouseEnterAccept = () => {
        setIsHoveredAccept(true);
    };

    const handleMouseLeaveAccept = () => {
        setIsHoveredAccept(false);
    };

    const handleMouseEnterDecline = () => {
        setIsHoveredDecline(true);
    };

    const handleMouseLeaveDecline = () => {
        setIsHoveredDecline(false);
    };


    return (
        <div
            style={cardStyle}
        >
            <div
                style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'transparent', margin: '2% 5%', color: '#112A46', width: '50%' }}
            >
                <div
                // style={{}}

                >student: {studentName}</div>
                <div>tutor: {tutorName}</div><br />
                <div>informations are in here</div>
            </div>
            <div
                style={{
                    display: 'flex', flexDirection: 'column', backgroundColor: 'transparent', color: 'black', width: '50%', alignItems: 'end', margin: '0% 5%', justifyContent: 'space-evenly'
                }}
            >
                <button
                    style={acceptStyle('#41E781')}
                    // style={hoverStyle}
                    onMouseEnter={handleMouseEnterAccept}
                    onMouseLeave={handleMouseLeaveAccept}
                >accept</button>
                <button
                    style={declineStyle('#F07F60')}
                    // style={hoverStyle}
                    onMouseEnter={handleMouseEnterDecline}
                    onMouseLeave={handleMouseLeaveDecline}
                >decline</button>
            </div>
        </div >

    )
}

export default student;




//   return (
//     <div
//       style={hoverStyle}
//       onMouseEnter={handleMouseEnterAccept}
//       onMouseLeave={handleMouseLeaveAccept}
//     >
//       Hover over me
//     </div>
//   );
// };

