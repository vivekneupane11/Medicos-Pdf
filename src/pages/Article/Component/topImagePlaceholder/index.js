import React from 'react'
import { CSSTransition } from 'react-transition-group';
import './_topImagePlaceholder.scss';

export const TopImagePlaceholder = () => {
    return (
        <div className='ImagePlaceholder-wrapper'>
           <CSSTransition
           classNames="placeholder"
           in={true}
           appear={true}
           timeout={3000}>
           <div className='image'>

</div>
           </CSSTransition>
           <div className='card'>
           
            <div className='blank'></div>
            <div className="black"></div>
            <div className="black"></div>

           </div>
            
        </div>
    )
}
