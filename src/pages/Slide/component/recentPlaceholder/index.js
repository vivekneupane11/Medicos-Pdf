import React from 'react'
import { CSSTransition } from 'react-transition-group'
import './_recentPlaceholder.scss'

const SlideRecentPlaceholder = () => {
    
    return (
        <>
        <div className='recentPlaceholder-wrapper'>
        <CSSTransition
            classNames="placeholder"
            in={true}
            appear={true}
            timeout={3000}>
            <div className='recentPlaceholder-wrapper-image'>

            </div>
            </CSSTransition>
            
        </div>
            
        </>
    )
}

export default SlideRecentPlaceholder
