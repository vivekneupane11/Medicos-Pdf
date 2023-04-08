import React, { useState, useEffect, useRef } from 'react'
import './_accordion.scss';
import { FaChevronRight } from 'react-icons/fa';



export const Accordion = ({ accordion }) => {

  const [setActive, setActiveState] = useState("");
  const [setRotate, setRotateState] = useState("accordion__icon");

  const para = useRef(null)
  const [height, setHeight] = useState('0px')

  const toggle = () => {
    setActiveState(setActive === "" ? "active" : "");
    setHeight(
      setActive === "active" ? "0px" : `${para.current.scrollHeight}px`
    );
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  }



  return (
    <div className="accordion-wrapper">

      <div className="accordion-main">

        <div className="accordion-main-content " >
          <button className={`accordion-main-content-heading ${setActive}`} onClick={() => toggle()}>
            <h2 >{accordion?.question}</h2>
            <FaChevronRight className={`${setRotate}`} width={10} fill={"#777"} />
          </button>


          <div
            ref={para}
            style={{ maxHeight: `${height}` }}
            className={`accordion-main-content-paragraph `}>
            <p>{accordion?.answer}</p>
          </div>

        </div>

      </div>

    </div>

  )
}
