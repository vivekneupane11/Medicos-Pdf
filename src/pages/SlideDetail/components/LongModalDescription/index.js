import React from 'react'
import './_longModalDescription.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes} from '@fortawesome/free-solid-svg-icons'

const LongModalDescription = ({show,close,data}) => {
    // const [show, setShow] = useState(false);

    return (
        <div>
          
        

                <div className={`SlideDetails-LongModal-containerN ${show ? `SlideDetails-LongModal-container` : ''}`}>
                    <div 
                    className={`SlideDetails-LongModal-container-wrapper`}
                    style={{
                        transform: show ? 'translateY(10vh)' : 'translateY(-100vh)',
                    }}
                    >
                        <div className={`SlideDetails-LongModal-container-wrapper-top`}>
                            <h5 className={`SlideDetails-LongModal-container-wrapper-top-h5`}>{data?.SlideName}</h5>
                            <FontAwesomeIcon icon={faTimes} className={`SlideDetails-LongModal-container-wrapper-top-icon`} onClick={() => close(false)} />
                        </div>

                        <p className={`SlideDetails-LongModal-container-wrapper-mid`}  
                        // dangerouslySetInnerHTML={{__html: data?.slideTextExtract }}
                        >
                           {data?.slideTextExtract }
                          
                        </p>
                        <div className={`SlideDetails-LongModal-container-wrapper-bottom`}>
                            <button className={`SlideDetails-LongModal-container-wrapper-bottom-btn2`} onClick={() =>close(false)}>CLOSE</button>
                        </div>
                    </div>
                </div>
              

        </div>
    )
}

export default LongModalDescription
