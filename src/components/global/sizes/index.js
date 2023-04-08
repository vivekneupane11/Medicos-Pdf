import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import './_sizes.scss'

const Sizes = ({type,txt}) => {

    const [isfalse,setIsfalse]=useState(false);
    const [small,setSmall]=useState(false);
    const [large,setLarge]=useState(false);
    const [extralarge,setExtralarge]=useState(false);

     useEffect(() => {
        const clr=()=>{
            switch(type){
                case 'Small':
                    setSmall(!small);
                    break;
                case 'Large':
                    setLarge(!large);
                    break;
                case 'ExtraLarge':
                    setExtralarge(!extralarge);
                    break;
                   }
        }
        clr()
        
     }, [])

    
    return (
       <>
        <div className={`sizes-${type}`}>
            <button className="texth" onClick={()=>setIsfalse(!isfalse)}>{txt}</button>
        </div>
    
       { small?
       
            <div className={`sizes-${type}-container ${isfalse?`sizes-${type}-containerN`:''}`}>
                    <div className={`sizes-${type}-container-content  ${isfalse?`sizes-${type}-container-content-slide`:''}`}>     
                        <div className={`sizes-${type}-container-content-top`}>
                            <h3>Modal title</h3>
                            <FontAwesomeIcon icon={faTimes} className={`sizes-${type}-container-content-top-icon`} onClick={()=>setIsfalse(!isfalse)}/>
                        </div>
                        <p className={`sizes-${type}-container-content-midtext`}>
                        I always felt like I could do anything.
                            That’s the main thing people are controlled
                            by! Thoughts- their perception of themselves! 
                            They're slowed down by their perception of 
                            themselves. If you're taught you can’t do anything,
                            you won’t do anything. I was taught I could do
                            everything.
                        </p>
                        <div className={`sizes-${type}-container-content-bottom`}>
                                <button className={`sizes-${type}-container-content-bottom-btnS`} >Save Changes</button>
                                <button className={`sizes-${type}-container-content-bottom-btnC`} onClick={()=>setIsfalse(!isfalse)}>Close</button> 
                        </div>
                    </div>
            </div>
            :
            ''
          }

        { large?
            
            <div className={`sizes-${type}-container ${isfalse?`sizes-${type}-containerN`:''}`}>
                    <div className={`sizes-${type}-container-content  ${isfalse?`sizes-${type}-container-content-slide`:''}`}>     
                        <div className={`sizes-${type}-container-content-top`}>
                            <h3>Modal title</h3>
                            <FontAwesomeIcon icon={faTimes} className={`sizes-${type}-container-content-top-icon`} onClick={()=>setIsfalse(!isfalse)}/>
                        </div>
                        <p className={`sizes-${type}-container-content-midtext`}>
                        The time is now for it to be okay to be great. People in this world shun people for being great. For being a bright color. For standing out. But the time is now to be okay to be the greatest you. Would you believe in what you believe in, if you were the only one who believed it?
                        <br></br>
                        <br></br>
                        I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their perception of themselves! They're slowed down by their perception of themselves. If you're taught you can’t do anything, you won’t do anything. I was taught I could do everything.
                        </p>
                        <div className={`sizes-${type}-container-content-bottom`}>
                                <button className={`sizes-${type}-container-content-bottom-btnS`} >Save Changes</button>
                                <button className={`sizes-${type}-container-content-bottom-btnC`} onClick={()=>setIsfalse(!isfalse)}>Close</button> 
                        </div>
                    </div>
            </div>
            :
            ''
            }

            { extralarge?
                
                <div className={`sizes-${type}-container ${isfalse?`sizes-${type}-containerN`:''}`}>
                        <div className={`sizes-${type}-container-content  ${isfalse?`sizes-${type}-container-content-slide`:''}`}>     
                            <div className={`sizes-${type}-container-content-top`}>
                                <h3>Modal title</h3>
                                <FontAwesomeIcon icon={faTimes} className={`sizes-${type}-container-content-top-icon`} onClick={()=>setIsfalse(!isfalse)}/>
                            </div>
                            <p className={`sizes-${type}-container-content-midtext`}>
                            Society has put up so many boundaries, so many limitations on what’s right and wrong that it’s almost impossible to get a pure thought out. It’s like a little kid, a little boy, looking at colors, and no one told him what colors are good, before somebody tells you you shouldn’t like pink because that’s for girls, or you’d instantly become a gay two-year-old. Why would anyone pick blue over pink? Pink is obviously a better color. Everyone’s born confident, and everything’s taken away from you
                            <br></br>
                            <br></br>
                            As we live, our hearts turn colder. Cause pain is what we go through as we become older. We get insulted by others, lose trust for those others. We get back stabbed by friends. It becomes harder for us to give others a hand. We get our heart broken by people we love, even that we give them all we have. Then we lose family over time. What else could rust the heart more over time? Blackgold.
                            </p>
                            <div className={`sizes-${type}-container-content-bottom`}>
                                    <button className={`sizes-${type}-container-content-bottom-btnS`} >Save Changes</button>
                                    <button className={`sizes-${type}-container-content-bottom-btnC`} onClick={()=>setIsfalse(!isfalse)}>Close</button> 
                            </div>
                        </div>
                </div>
                :
                ''
                }

         
      </>
    )
}

export default Sizes
