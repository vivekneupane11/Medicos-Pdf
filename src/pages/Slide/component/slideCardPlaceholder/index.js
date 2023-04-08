import React from 'react'
import './_slidecardPlaceholder.scss'

import { AvatarPlaceholder } from '../../../../components/global/images'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

export const SlideCardPlaceholder = () => {
    return (
       <>
           <TransitionGroup>
           <div className='slidecardPlaceholder-wrapper'>
           <CSSTransition 
            classNames="placeholder"
            in={true}
            appear={true}
            timeout={3000}
           >

           <h1 className='slidecardPlaceholder-wrapper-image-container'>
            </h1>

           </CSSTransition>
           
           <CSSTransition 
            classNames="placeholder"
            in={true}
            appear={true}
            timeout={3000}
           >
            <h1 className='slidecardPlaceholder-wrapper-heading-container'>
            
            </h1>

            </CSSTransition>

            <CSSTransition
            classNames="placeholder"
            in={true}
            appear={true}
            timeout={3000}>
            <h1 className='slidecardPlaceholder-wrapper-subheading-container'>
            </h1>
            </CSSTransition>

            <div className='slidecardPlaceholder-wrapper-bottom-container'>
                <div className='slidecardPlaceholder-wrapper-bottom-container-profile'>
               
                    <div className='slidecardPlaceholder-wrapper-bottom-container-profile-image'>
                    <CSSTransition
            classNames="placeholder"
            in={true}
            appear={true}
            timeout={3000}>
                        <AvatarPlaceholder size={40}/>
                        </CSSTransition>

                    </div>
                    
                    <CSSTransition
            classNames="placeholder"
            in={true}
            appear={true}
            timeout={3000}>
                    <div className='slidecardPlaceholder-wrapper-bottom-container-profile-username'>
                    </div>
                    </CSSTransition>



                </div>


            </div>
            
        </div>
           </TransitionGroup>
       </>
    )
}
