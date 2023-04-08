import React,{useState,useEffect} from 'react'
import './_tooltips.scss'



const Tooltips = ({activeColor,position,txt}) => {

    const [istrue,setIstrue]=useState('false');
    const [className,setClassName]=useState(null);
   

    useEffect(() => {
        const check=()=>{
            let class1='left';
            let class2='right';
            let class3='top';
            let class4='bottom';

         switch(position)
         {
           case 'left':
                setClassName(class1);
                break;
           case 'right':
               setClassName(class2);
               break;
           case 'top':
             setClassName(class3);
             break;
           case 'bottom':
             setClassName(class4);
             break;
        }
         
        }
        check();
        
     }, )

    return (
        <div className={`tooltips-wrapper-${activeColor}`}>
            <button className="tooltips-btn" onMouseOver={()=>setIstrue(!istrue)}  onMouseOut={()=> setIstrue(!istrue)}>{activeColor}</button>
             {!istrue?
               <p className={`tooltips-tip-${className} ${istrue?'':`tooltips-tipS-${className}`}`}>{txt}</p>
               :
               ''
            }
           
          
        </div>
    )
}

export default Tooltips
