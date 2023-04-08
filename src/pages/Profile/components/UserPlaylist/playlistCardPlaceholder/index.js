import React from 'react'
import './_playlistCardPlaceholder.scss';
import { AvatarPlaceholder } from '../../../../../components/global/images'
import { CSSTransition } from 'react-transition-group';

export const PlaylistCardPlaceholder = () => {
    return (
        <div className='playlistCardPlaceholder-wrapper'>
            <div className='playlistCardPlaceholder-wrapper-container'>
            <CSSTransition
            classNames="placeholder"
            in={true}
            appear={true}
            timeout={3000}>
            <div className='image'>

                </div>
                
            </CSSTransition>
               
                <div className='bottom'>
                    <div className='profile'>
                        <AvatarPlaceholder/>

                    </div>
                    <CSSTransition
            classNames="placeholder"
            in={true}
            appear={true}
            timeout={3000}>
                    <h1></h1>
                    </CSSTransition>


                </div>
            </div>

            
        </div>
    )
}
