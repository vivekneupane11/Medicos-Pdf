import React from 'react'
import { CSSTransition } from 'react-transition-group'
import './_worldwidePlaceholder.scss'

const WorldWidePlaceholder = () => {
    
    return (
        <>
        <div className='worldwidePlaceholder-wrapper'>
        <CSSTransition
            classNames="placeholder"
            in={true}
            appear={true}
            timeout={3000}>
            <div className='worldwidePlaceholder-wrapper-image'>

            </div>
            </CSSTransition>
            <CSSTransition
            classNames="placeholder"
            in={true}
            appear={true}
            timeout={3000}>
            <div className='worldwidePlaceholder-wrapper-image'>

            </div>
            </CSSTransition>
            <CSSTransition
            classNames="placeholder"
            in={true}
            appear={true}
            timeout={3000}>
            <div className='worldwidePlaceholder-wrapper-image'>

            </div>
            </CSSTransition>
            
        </div>
            
        </>
    )
}

export default WorldWidePlaceholder
