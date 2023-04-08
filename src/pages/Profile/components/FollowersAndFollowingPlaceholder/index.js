import React from 'react'
import { CSSTransition } from 'react-transition-group';
import './_followersPlaceholder.scss';

export const FollowersPlaceholder = () => {
    return (
        <div className='FollowersPlaceholder-wrapper'>
        <div className='FollowersPlaceholder-wrapper-container'>
        <CSSTransition
        classNames="placeholder"
        in={true}
        appear={true}
        timeout={3000}
        >
          <div className='profile'>

            </div>

        </CSSTransition>
          
            
            <div className='description'>
            <CSSTransition
        classNames="placeholder"
        in={true}
        appear={true}
        timeout={3000}
        >
               <h1 className='username'></h1>
               </CSSTransition>
               <CSSTransition
        classNames="placeholder"
        in={true}
        appear={true}
        timeout={3000}
        >
                <h2 className='email'></h2>
                </CSSTransition>

            </div>

        </div>
            
        </div>
    )
}
