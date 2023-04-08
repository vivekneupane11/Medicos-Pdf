import React, { useState ,useEffect} from 'react'
import './_modals.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBell, faUnlockAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import git from '../../../images/github.svg'
import google from '../../../images/google.svg'


const Modals = ({ activeColor, type }) => {

    const [checktrue, setChecktrue] = useState(false);
    const [defaul, setDefaul] = useState(false);
    const [notification, setNotification] = useState(false);
    const [longmodal, setLongmodal] = useState(false);
    const [messagemodal, setMessagemodal] = useState(false);
    const [formmodal, setFormmodal] = useState(false);
    const [signupmodal, setSignupmodal] = useState(false);


   useEffect(() => {

    const clear = () => {
        switch (type) {
            case 'default':
                setDefaul(!defaul);
                break;
            case 'Notification':
                setNotification(!notification);
                break;
            case 'LongModal':
                setLongmodal(!longmodal);
                break;
            case 'MessageModal':
                setMessagemodal(!messagemodal);
                break;
            case 'FormModal':
                setFormmodal(!formmodal);
                break;
            case 'SignupModal':
                setSignupmodal(!signupmodal);
                break;
        }
    }
   
    clear()
       
   }, [])



    return (
        <>
            <div className={`modals-${activeColor}`}>
                <button className="textM" onClick={() => setChecktrue(!checktrue)}>{type}</button>
            </div>

            {/* default modal*/}
            {defaul ?
                <div className={`${type}-container ${checktrue ?`${type}-containerN` : ''}`}>
                    <div 
                    className={`${type}-container-wrapper`}
                    style={{
                        transform: checktrue ? 'translateY(10vh)' : 'translateY(-100vh)',
                      }}
                    >
                        <div className={`${type}-container-wrapper-top`}>
                            <h5 className={`${type}-container-wrapper-top-h5`}>Type your modal title</h5>
                            <FontAwesomeIcon icon={faTimes} className={`${type}-container-wrapper-top-icon`} onClick={() => setChecktrue(!checktrue)} />
                        </div>

                        <p className={`${type}-container-wrapper-mid`}>
                            Far far away, behind the word mountains,
                            far from the countries Vokalia and Consonantia,
                            there live the blind texts. Separated they live
                            in Bookmarksgrove right at the coast of the Semantics
                            , a large language ocean.
                            <br></br>
                            <br></br>
                            A small river named Duden flows by their
                            place and supplies it with the necessary
                            regelialia. It is a paradisematic country,
                            in which roasted parts of sentences fly into
                            your mouth.
                        </p>
                        <div className={`${type}-container-wrapper-bottom`}>
                            <button className={`${type}-container-wrapper-bottom-btn`}>SAVE CHANGES</button>
                            <span className={`${type}-container-wrapper-bottom-p`} onClick={() => setChecktrue(!checktrue)}>close</span>
                        </div>
                    </div>
                </div>
                :
                ''
            }

            {/* notification */}
            {notification ?

                <div className={`${type}-containerN ${checktrue ? `${type}-container` : ''}`}>
                    <div 
                    className={`${type}-container-wrapper`}
                     style={{
                        transform: checktrue ? 'translateY(10vh)' : 'translateY(-100vh)',
                      }}
                    >
                        <div className={`${type}-container-wrapper-top`}>
                            <h5 className={`${type}-container-wrapper-top-h5`}>Your attention is required</h5>
                            <FontAwesomeIcon icon={faTimes} className={`${type}-container-wrapper-top-icon`} onClick={() => setChecktrue(!checktrue)} />
                        </div>

                        <div className={`${type}-container-wrapper-mid`}>
                            <FontAwesomeIcon icon={faBell} size='3x' className={`${type}-container-wrapper-mid-icon`} />
                            <h5 className={`${type}-container-wrapper-mid-h5`}>YOU SHOULD READ THIS!</h5>
                            <p className={`${type}-container-wrapper-mid-p`}>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                        </div>
                        <div className={`${type}-container-wrapper-bottom`}>
                            <button className={`${type}-container-wrapper-bottom-btn`}>ok,got it</button>
                            <span className={`${type}-container-wrapper-bottom-p`} onClick={() => setChecktrue(!checktrue)}>close</span>
                        </div>
                    </div>
                </div>
                :
                ''
            }

            {/* LongModal */}
            {longmodal ?

                <div className={`${type}-containerN ${checktrue ? `${type}-container` : ''}`}>
                    <div 
                    className={`${type}-container-wrapper`}
                    style={{
                        transform: checktrue ? 'translateY(10vh)' : 'translateY(-100vh)',
                      }}
                    >
                        <div className={`${type}-container-wrapper-top`}>
                            <h5 className={`${type}-container-wrapper-top-h5`}> modal title</h5>
                            <FontAwesomeIcon icon={faTimes} className={`${type}-container-wrapper-top-icon`} onClick={() => setChecktrue(!checktrue)} />
                        </div>

                        <p className={`${type}-container-wrapper-mid`}>
                            I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their perception of themselves! They're slowed down by their perception of themselves. If you're taught you can’t do anything, you won’t do anything. I was taught I could do everything.
                            <br></br>
                            <br></br>
                            As we live, our hearts turn colder. Cause pain is what we go through as we become older. We get insulted by others, lose trust for those others. We get back stabbed by friends. It becomes harder for us to give others a hand. We get our heart broken by people we love, even that we give them all we have. Then we lose family over time. What else could rust the heart more over time? Blackgold.
                            <br></br>
                            <br></br>
                            We’re not always in the position that we want to be at. We’re constantly growing. We’re constantly making mistakes. We’re constantly trying to express ourselves and actualize our dreams. If you have the opportunity to play this game of life you need to appreciate every moment. A lot of people don’t appreciate the moment until it’s passed.
                            <br></br>
                            <br></br>
                            There’s nothing I really wanted to do in life that I wasn’t able to get good at. That’s my skill. I’m not really specifically talented at anything except for the ability to learn. That’s what I do. That’s what I’m here for. Don’t be afraid to be wrong because you can’t learn anything from a compliment.
                            <br></br>
                            <br></br>
                            It really matters and then like it really doesn’t matter. What matters is the people who are sparked by it. And the people who are like offended by it, it doesn’t matter. Because it's about motivating the doers. Because I’m here to follow my dreams and inspire other people to follow their dreams, too.
                            <br></br>
                            <br></br>
                            The time is now for it to be okay to be great. People in this world shun people for being great. For being a bright color. For standing out. But the time is now to be okay to be the greatest you. Would you believe in what you believe in, if you were the only one who believed it?
                        </p>
                        <div className={`${type}-container-wrapper-bottom`}>
                            <button className={`${type}-container-wrapper-bottom-btn1`}>SAVE CHANGES</button>
                            <button className={`${type}-container-wrapper-bottom-btn2`} onClick={() => setChecktrue(!checktrue)}>CLOSE</button>
                        </div>
                    </div>
                </div>
                :
                ''
            }

            {/* MessageModal */}
            {messagemodal ?

                <div className={`${type}-containerN ${checktrue ? `${type}-container` : ''}`}>
                    <div 
                    className={`${type}-container-wrapper`}
                    style={{
                        transform: checktrue ? 'translateY(10vh)' : 'translateY(-100vh)',
                      }}
                    >
                        <div className={`${type}-container-wrapper-top`}>
                            <h6 className={`${type}-container-wrapper-top-h5`}> new message to CT</h6>
                            <FontAwesomeIcon icon={faTimes} className={`${type}-container-wrapper-top-icon`} onClick={() => setChecktrue(!checktrue)} />
                        </div>

                        <form className={`${type}-container-wrapper-mid`}>
                            <div className={`${type}-container-wrapper-mid-top`}>
                                <label className={`${type}-container-wrapper-mid-top-l1`}>Recipient:</label>
                                <input type='text' placeholder='name' className={`${type}-container-wrapper-mid-top-input`}></input>
                            </div>
                            <div className={`${type}-container-wrapper-mid-bottom`}>
                                <label className={`${type}-container-wrapper-mid-bottom-l1`}>Message:</label>
                                <textarea rows="3" className={`${type}-container-wrapper-mid-bottom-input`}></textarea>
                            </div>

                        </form>

                        <div className={`${type}-container-wrapper-bottom`}>
                            <button className={`${type}-container-wrapper-bottom-btn1`}>SEND MESSAGE</button>
                            <button className={`${type}-container-wrapper-bottom-btn2`} onClick={() => setChecktrue(!checktrue)}>CLOSE</button>
                        </div>
                    </div>
                </div>
                :
                ''
            }

            {/* FormModal */}
            {formmodal ?

                <div id={type} className={`${type}-containerN ${checktrue ? `${type}-container` : ''}`} onClick={() =>{setChecktrue(!checktrue)}}>
                    <div 
                    className={`${type}-container-wrapper `}
                    style={{
                        transform: checktrue ? 'translateY(10vh)' : 'translateY(-100vh)',
                      }}
                    >
                        <div className={`${type}-container-wrapper-top`}>
                            <p className={`${type}-container-wrapper-top-p`}>Sign in with</p>
                            <div className={`${type}-container-wrapper-top-links`}>
                                <picture className={`${type}-container-wrapper-top-links-l1`}>
                                    <img src={git} alt="git" height='20px' width='20px' className={`${type}-container-wrapper-top-links-l1-img`} />
                                    <label className={`${type}-container-wrapper-top-links-l1-label`}>GITHUB</label>
                                </picture>
                                <picture className={`${type}-container-wrapper-top-links-l2`}>
                                    <img src={google} alt="google" height='20px' width='20px' className={`${type}-container-wrapper-top-links-l2-img`} />
                                    <label className={`${type}-container-wrapper-top-links-l2-label`}>GOOGLE</label>
                                </picture>
                            </div>

                        </div>

                        <div className={`${type}-container-wrapper-bottom`}>
                            <p className={`${type}-container-wrapper-bottom-p`}>Or sign in with credentials</p>
                            <div className={`${type}-container-wrapper-bottom-credentials`}>
                                <div className={`${type}-container-wrapper-bottom-credentials-in1`} >
                                    <FontAwesomeIcon icon={faEnvelope} className={`${type}-container-wrapper-bottom-credentials-in1-icon`} />
                                    <input type='text' placeholder='Email' className={`${type}-container-wrapper-bottom-credentials-in1-input`}></input>
                                </div>
                                <div className={`${type}-container-wrapper-bottom-credentials-in2`}>
                                    <FontAwesomeIcon icon={faUnlockAlt} className={`${type}-container-wrapper-bottom-credentials-in2-icon`} />
                                    <input type='text' placeholder='Password' className={`${type}-container-wrapper-bottom-credentials-in2-input`}></input>
                                </div>
                                <div className={`${type}-container-wrapper-bottom-credentials-in3`}>
                                    <input type='checkbox' className={`${type}-container-wrapper-bottom-credentials-in3-input`}></input>
                                    <p className={`${type}-container-wrapper-bottom-credentials-in3-p`}>Remember me</p>
                                </div>
                            </div>
                            <button className={`${type}-container-wrapper-bottom-btn`} >Sign IN</button>

                        </div>
                    </div>
                </div>
                :
                ''
            }

            {/* SignupModal */}
            {signupmodal ?

                <div id={type} className={`${type}-containerN ${checktrue ? `${type}-container` : ''}`} onClick={() => {setChecktrue(!checktrue)}}>
                    <div 
                    className={`${type}-container-wrapper`}
                    style={{
                        transform: checktrue ? 'translateY(10vh)' : 'translateY(-100vh)',
                      }}
                    >
                        <div className={`${type}-container-wrapper-top`}>
                            <p className={`${type}-container-wrapper-top-p`}>Sign in with</p>
                            <div className={`${type}-container-wrapper-top-links`}>
                                <picture className={`${type}-container-wrapper-top-links-l1`}>
                                    <img src={google} alt="git" height='20px' width='20px' className={`${type}-container-wrapper-top-links-l1-img`} />
                                    <label className={`${type}-container-wrapper-top-links-l1-label`}>GOOGLE</label>
                                </picture>
                                <picture className={`${type}-container-wrapper-top-links-l2`}>
                                    <img src={git} alt="google" height='20px' width='20px' className={`${type}-container-wrapper-top-links-l2-img`} />
                                    <label className={`${type}-container-wrapper-top-links-l2-label`}>GITHUB</label>
                                </picture>
                            </div>

                        </div>

                        <div className={`${type}-container-wrapper-bottom`}>
                            <p className={`${type}-container-wrapper-bottom-p`}>Or sign up</p>
                            <div className={`${type}-container-wrapper-bottom-credentials`}>
                                <div className={`${type}-container-wrapper-bottom-credentials-in1`} >
                                    <FontAwesomeIcon icon={faEnvelope} className={`${type}-container-wrapper-bottom-credentials-in1-icon`} />
                                    <input type='text' placeholder='Email' className={`${type}-container-wrapper-bottom-credentials-in1-input`}></input>
                                </div>
                                <div className={`${type}-container-wrapper-bottom-credentials-in2`}>
                                    <FontAwesomeIcon icon={faUnlockAlt} className={`${type}-container-wrapper-bottom-credentials-in2-icon`} />
                                    <input type='text' placeholder='Password' className={`${type}-container-wrapper-bottom-credentials-in2-input`}></input>
                                </div>
                                <div className={`${type}-container-wrapper-bottom-credentials-in3`}>
                                    <FontAwesomeIcon icon={faUnlockAlt} className={`${type}-container-wrapper-bottom-credentials-in3-icon`} />
                                    <input type='text' placeholder='Confirm Password' className={`${type}-container-wrapper-bottom-credentials-in3-input`}></input>
                                </div>
                            </div>
                            <button className={`${type}-container-wrapper-bottom-btn`} >Sign IN</button>

                        </div>
                    </div>
                </div>
                :
                ''
            }


        </>
    )
}

export default Modals