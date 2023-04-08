import React,{useState} from 'react'
import { ImCancelCircle } from 'react-icons/im'
import { TiTick } from 'react-icons/ti'
import './_toastTop.scss'
const ToastTop = ({text,show}) => {
   
    const [showToast,setShowToast]=useState(show)
    return (
        <div className={` ${showToast?'toastTop_container':"hide_toastTop"}`}>
            <div></div>
            <div className='toastTop_container_mid'>
                <div className='toastTop_container_mid_icon'>
                    <TiTick className='toastTop_container_mid_icon_tick'/>
                </div>
                <p className='toastTop_container_mid_para'>{text}</p>
               
            </div>
            <ImCancelCircle className='toastTop_container_cancelIcon'  onClick={()=>setShowToast(!showToast)}/>
            
            
        </div>
    )
}

export default ToastTop
