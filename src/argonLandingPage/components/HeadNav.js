import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
// import { faReact } from '@fortawesome/free-brands-svg-icons'

const HeadNav = () => {
    const [state]=useState(
        {       
            icon:require('../images/logo1.png').default,
            list1:"Elements",
            list2:"Design Blocks",
            list3:"Examples",
            list4:"App Pages",
        }
    )

    const [stateOne, setStateOne] = useState(false);
    // const [count,setCount]=useState(1);
    const count=[0];
    useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return ()=>{
        window.removeEventListener('scroll')
    }
    }, [])
    const handleScroll = () => {
        // if(window.scrollY > getYPosition()) {
        //     setStateOne(true); 
        // } else {
        //     setStateOne(false);
        // }

       
         count.push(getYPosition());
        //  console.log(count);
        
       
        if(count[count.length-1]<count[count.length-2])
        {
            setStateOne(true);
        }
        else{
            setStateOne(false);
        }
    
        count.shift()
         

        function getYPosition(){
            var top  = window.pageYOffset || document.documentElement.scrollTop
            return top;
          }
        //    console.log(getYPosition())
    }

    return (
        <div className={`navbar ${stateOne ? 'gray-dark-bg' : 'transparent'} `}>
       
            <div className="navbar_content">

                <div className="navbar_content_left">
                    <img src={state.icon} alt="logo" />
                </div>

                <ul className="navbar_content_right">
                    <li className="navbar_content_right-elements">
                        <a>{state.list1}</a>

                        {/* <div>
                            <div>
                                <div>
                                    image
                                    heading
                                    para
                                </div>
                                <div>
                                    image
                                    heading
                                    para
                                </div>

                            </div>
                            <div>
                                <div>
                                    image
                                    heading
                                </div>
                                <div>
                                    image
                                    heading
                                </div>
                                <div>
                                    image
                                    heading
                                </div>
                                
                            </div>
                        </div> */}
                    </li>
                    <li className="navbar_content_right-elements">
                        <a >{state.list2}</a>
                        {/* <div className="navbar_content_right-elements-hover">
                            <ul>
                                <li>
                                    <a><FontAwesomeIcon icon={faReact}/></a>
                                    
                                </li>
                                <li>
                                    <h3>Components</h3>
                                </li>
                            
                            </ul>
                        </div> */}
                        
                    </li>
                    <li className="navbar_content_right-elements">
                        <a >{state.list3}</a>
                        {/* <ul>
                            <li>
                                image
                                heading
                            </li>
                            <li>
                                image
                                heading
                            </li>
                            <li>
                                image
                                heading
                            </li>
                            <li>
                                image
                                heading
                            </li>
                            <li>
                                image
                                heading
                            </li>
                            <li>
                                image
                                heading
                            </li>
                            <li>
                                image
                                heading
                            </li>
                            <li>
                                image
                                heading
                            </li>
                            <li>
                                image
                                heading
                            </li>
                            <li>
                                image
                                heading
                            </li>
                        </ul> */}
                    </li>
                    <li className="navbar_content_right-elements">
                        <a>{state.list4}</a>
                        {/* <ul>
                            <li>
                                image
                                heading
                                *7
                            </li>
                        </ul> */}
                    </li>
                    <li className="navbar_content_right-bar">
                        <a><FontAwesomeIcon icon={faBars} size="2x"/></a>
                    </li>
                </ul>

            </div>
      
        </div>
    )
}

export default HeadNav
