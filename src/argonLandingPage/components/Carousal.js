import React ,{useState}from 'react'
import backVid from '../images/carousal.mp4'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

const Carousal = () => {

   const [state]=useState({
       headingOne:'People stories',
       paragraph:'The time is right now!',
       buttonText:'PLAY MORE',
   })
    return (
        < >
            <video 
            autoPlay
            loop
            muted
            className="back-video"
            >
                <source src={backVid} type="video/mp4"/>
            </video>
            
          
            <div className="text-container">
                <div className="text-container-top">
                    <h1>{state.headingOne}</h1>
                    <p>{state.paragraph}</p>
                </div>

                <div className="text-container-bottom">
                <FontAwesomeIcon icon={faPlay } className="text-container-bottom-playIcon"/>
                <button>{state.buttonText}</button>
                </div>
            </div>
           

          
            
        </>
    )
}

export default Carousal
