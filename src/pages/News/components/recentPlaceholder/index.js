import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './_recentPlaceholder.scss'

const RecentPlaceholder = () => {
 

    return (
        <>
        <TransitionGroup>
            <div className="newsRecentPlaceholder-wrapper">
            <CSSTransition
            classNames="placeholder"
            in={true}
            appear={true}
            timeout={3000}>
            <div className="newsRecentPlaceholder-wrapper-left" >

            </div>
            </CSSTransition>

            

            <div className="newsRecentPlaceholder-wrapper-right">
            
           
            <h1 className="newsRecentPlaceholder-wrapper-right-head">Latest Post</h1>
           
                
                <div className="newsRecentPlaceholder-wrapper-right-description">
                    
                        <div className="newsRecentPlaceholder-wrapper-right-description-wrapper">
                        <CSSTransition
            classNames="placeholder"
            in={true}
            appear={true}
            timeout={3000}>
                            <h3 className="newsRecentPlaceholder-wrapper-right-description-wrapper-head" ></h3>
                            </CSSTransition>
                            <CSSTransition
            classNames="placeholder"
            in={true}
            appear={true}
            timeout={3000}>
                            <h3></h3>
                            </CSSTransition>
                        </div>
                


                </div>
                <div className="newsRecentPlaceholder-wrapper-right-description">
                    
                    <div className="newsRecentPlaceholder-wrapper-right-description-wrapper">
                    <CSSTransition
            classNames="placeholder"
            in={true}
            appear={true}
            timeout={3000}>
                        <h3 className="newsRecentPlaceholder-wrapper-right-description-wrapper-head" ></h3>
                        </CSSTransition>
                        <CSSTransition
            classNames="placeholder"
            in={true}
            appear={true}
            timeout={3000}>
                        <h3></h3>
                        </CSSTransition>
                    </div>
            


            </div>
            <div className="newsRecentPlaceholder-wrapper-right-description">
                    
                    <div className="newsRecentPlaceholder-wrapper-right-description-wrapper">
                    <CSSTransition
            classNames="placeholder"
            in={true}
            appear={true}
            timeout={3000}>
                        <h3 className="newsRecentPlaceholder-wrapper-right-description-wrapper-head" ></h3>
                        </CSSTransition>
                        <CSSTransition
            classNames="placeholder"
            in={true}
            appear={true}
            timeout={3000}>
                        <h3></h3>
                        </CSSTransition>
                    </div>
            


            </div>

            </div>
          

        </div>
        </TransitionGroup>
            

        </>
    )
}

export default React.memo(RecentPlaceholder)
