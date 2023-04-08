import React from 'react'
import { CSSTransition } from 'react-transition-group'
import './_clipboardPlaceholder.scss';

export const ClipboardPlaceholder = () => {
    return (
        <div className='clipboardPlaceholder-wrapper'>
        <CSSTransition
        classNames="placeholder"
        timeout={3000}
        in={true}
        appear={true}
        >
            <div className='image'>
            </div>
            </CSSTransition>
            
        </div>
    )
}
