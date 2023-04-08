import React,{useState,useEffect} from 'react'
import './_toogle.scss'

const Toogle = ({state,activeColor}) => {

    const [isTrue,setIsTrue]=useState(state=='true');
 

  
    const onclick=()=>{
        setIsTrue(!isTrue);
    
    }
  
   

    return (
        <div className={`toogle-containerColor${activeColor}`}>
        <div className={`toogle-container ${isTrue?'toogle-container':'toogle-container-color-off'}`}  onClick={()=>(onclick())}> 
            <div className={`toogle-on-off ${isTrue?'toogle-on':'toogle-on-off'}`}>ON</div>
            <button  className={`toogle-button-toogle-left ${isTrue?'toogle-button-toogle-right':'toogle-button-toogle-left'}`}  />
            <div className={`toogle-off ${isTrue?'toogle-off-off':'toogle-off'}`}>OFF</div>
        </div>
        </div>
    )
}

export default Toogle
