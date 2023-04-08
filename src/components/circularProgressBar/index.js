import React, { useState, useEffect } from 'react'
import './_circularProgressBar.scss'
const CircularProgressBar = ({ squareSize, strokeWidth,animationTime = 100, start, circularLoading, statusCode }) => {

    const [startLoading, setStartLoading] = useState(start)

    const [percentageV, setPercentageV] = useState(0)

    const radius = (squareSize - strokeWidth) / 2;

    const viewBox = `0 0 ${squareSize} ${squareSize}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2;
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - dashArray * percentageV / 100;

    const [showUploadingText, setShowUploadingText] = useState(false)

    const startLoader = () => {
        let i = 1
        let x = 0;
        setInterval(() => {

            if (i < 101) {
                i++;
                x = Math.round(x + .9);
                if (i === 95 && startLoading === 200) {
                    circularLoading(false)
                }
                else if (i > 95) {
                    setPercentageV(95)
                    setShowUploadingText(true)
                }
                else {
                    setPercentageV(x)
                }

            }
        }, animationTime)
    }

    useEffect(() => {
        let isMounted = true;
        if (startLoading === true) {
            startLoader()
        }


        return () => {
            isMounted = false;
        }
    }, [startLoading === true])




    return (
        <>
            {
                start ?
                    <div className="circularProgressBar-container">
                        <svg
                            width={squareSize}
                            height={squareSize}
                            viewBox={viewBox}>
                            <circle
                                className="circle-background"
                                cx={squareSize / 2}
                                cy={squareSize / 2}
                                r={radius}
                                strokeWidth={`${strokeWidth}px`} />
                            <circle
                                className="circle-progress"
                                cx={squareSize / 2}
                                cy={squareSize / 2}
                                r={radius}
                                strokeWidth={`${strokeWidth}px`}
                                // Start progress marker at 12 O'Clock
                                transform={`rotate(-90 ${squareSize / 2} ${squareSize / 2})`}
                                style={{
                                    strokeDasharray: dashArray,
                                    strokeDashoffset: dashOffset
                                }} />
                            <text
                                className="circle-text"
                                x="50%"
                                y="50%"
                                dy=".3em"
                                textAnchor="middle"
                            >
                                {`${percentageV}%`}
                            </text>
                            {/* <text
                                className="circle-text"
                                x="50%"
                                y="20%"
                                dy=".3em"
                                textAnchor="middle"
                                onClick={() => { circularLoading(false) }}
                                style={{ cursor: 'pointer' }}
                            >
                                x
                            </text> */}

                            {
                                showUploadingText &&
                                <text
                                    className="circle-text-uploading"
                                    x="50%"
                                    y="70%"
                                    dy=".1em"
                                    textAnchor="middle"
                                    style={{ cursor: 'pointer' }}
                                >
                                    Compressing...
                                </text>
                            }
                        </svg>





                    </div>
                    :
                    ''
            }
            {/* <button onClick={()=>setStartLoading(true)}>click me</button> */}
        </>
    )
}

export default CircularProgressBar
