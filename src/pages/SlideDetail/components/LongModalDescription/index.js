import React,{useState,useEffect} from 'react'
import './_longModalDescription.scss';
import CloseCircle from '../../../../components/global/icons/xMark_Circle';

const LongModalDescription = ({show,close,data}) => {
    // const [show, setShow] = useState(false);
    const [active,setActive]=useState(false)
    const clickhandlercloser = () =>close(false)
    const clickhandlercloser2 = () => close(false)

    return (
        <div>
                <div className={`SlideDetails-LongModal-container ${show ? `SlideDetails-LongModal-containerActive` : ''}`}>
               
                    <div 
                    className={`SlideDetails-LongModal-container-wrapper ${show?'SlideDetails-LongModal-container-wrapperActive':''}`}
                    >
                        <div className={`SlideDetails-LongModal-container-wrapper-top`}>
                            <h5 className={`SlideDetails-LongModal-container-wrapper-top-h5`}>{data?.SlideName}</h5>
                            <div onClick={clickhandlercloser2}>

                            <CloseCircle className={`SlideDetails-LongModal-container-wrapper-top-icon`}  />
                            </div>
                        </div>

                        <p className={`SlideDetails-LongModal-container-wrapper-mid`}  
                        // dangerouslySetInnerHTML={{__html: data?.slideTextExtract }}
                        >
                           {data?.slideDescription}
                          
                        </p>
                        <div className={`SlideDetails-LongModal-container-wrapper-bottom`}>
                            <button className={`SlideDetails-LongModal-container-wrapper-bottom-btn2`} onClick={clickhandlercloser}>CLOSE</button>
                        </div>
                    </div>
                </div>
              

        </div>
    )
}

export default LongModalDescription
