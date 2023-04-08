import React,{useState,useEffect} from 'react'
import './_popovers.scss'

const Popovers = ({activeColor,txt,position}) => {

    const [isCheck,setIsCheck]=useState(false);
    const [className,setClassName]=useState(null);
    const Popover=()=>{
        setIsCheck(!isCheck);
    }

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
        <div className={`popovers-wrapper-${activeColor}`}>
            <button className="btnP" onClick={()=>Popover()}>{txt}</button>

            {isCheck?
                  
                    <div className={`popover-${className}`}>
                    <div className="Phead">Popover on {className}</div>
                    <div className="Pdesc">This is a pop over.this is in test phase sasda sasdas sdasdasdas </div>
                    </div>
                    :
                    ''
            }
           
        
       </div>
    )
}

export default Popovers
