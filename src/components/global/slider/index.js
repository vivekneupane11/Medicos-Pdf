import React, { useState } from 'react'
// import "./_slider.scss";

const Slider = ({ min, max, value, thumbColor, progressColor }) => {

    const [currentValue, setCurrentValue] = useState(() => value);


    // var slider = document.getElementById("myRange");
    // var output = document.getElementById("demo");
    // output.innerHTML = slider.value; // Display the default slider value

    // // Update the current slider value (each time you drag the slider handle)
    // slider.oninput = function () {
    //     output.innerHTML = this.value;
    // }

    return (
        <div className="slide-container">
            <div className="slide-container-wrapper">
                <h5>Round Range Slider</h5>
                <input
                    onChange={event => {
                        setCurrentValue(event.target.value)
                    }}
                    type="range"
                    min={min}
                    max={max}
                    value={currentValue}
                    className={`slider-thumb-${thumbColor ? thumbColor : "default"} slider slider-progress-${progressColor ? progressColor : "default"}`} id="myRange" />
                <p>Value: <span id="demo">{currentValue}</span></p>
            </div>
        </div>
    )
}

export default Slider
