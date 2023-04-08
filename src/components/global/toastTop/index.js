import React,{useState} from 'react'
import './_toastTop.scss'
import CloseCircle from '../icons/xMark_Circle'
import CheckCircle from '../icons/check_Circle'
const ToastTop = ({text,show}) => {
   
    const [showToast,setShowToast]=useState(show)
    const clickhandlersettoast = ()=>setShowToast(!showToast)
    return (
        <div className={` ${showToast?'toastTop_container':"hide_toastTop"}`}>
            <div></div>
            <div className='toastTop_container_mid'>
                <div className='toastTop_container_mid_icon'>
                    <CheckCircle className='toastTop_container_mid_icon_tick'/>
                </div>
                <p className='toastTop_container_mid_para'>{text}</p>
               
            </div>
            <div onClick={clickhandlersettoast}>

            <CloseCircle className='toastTop_container_cancelIcon' />
            </div>
            
            
        </div>
    )
}

export default ToastTop
