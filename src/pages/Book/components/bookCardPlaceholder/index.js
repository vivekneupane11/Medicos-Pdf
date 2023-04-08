
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './_bookCardPlaceholder.scss';

const BookCardPlaceholder = () => {

    
      
     
    return (
        <>
            <div className="book-card-placeholder-container">
            <CSSTransition
                            classNames="placeholder"
                            in={true}
                            appear={true}
                            timeout={3000}
                            >
            <div className='image'>

            </div>
            </CSSTransition>
     
                <div className="book-card-placeholder-container-content">
                <CSSTransition
                            classNames="placeholder"
                            in={true}
                            appear={true}
                            timeout={3000}
                            >
                    <p className='heading'></p>
                    </CSSTransition>
                    <CSSTransition
                            classNames="placeholder"
                            in={true}
                            appear={true}
                            timeout={3000}
                            >
                    <p ></p>
                    </CSSTransition>
                    <CSSTransition
                            classNames="placeholder"
                            in={true}
                            appear={true}
                            timeout={3000}
                            >
                        <p></p>
                        </CSSTransition>
                    <div className="book-card-placeholder-container-content-rating">
                    

                        <CSSTransition
                            classNames="placeholder"
                            in={true}
                            appear={true}
                            timeout={3000}
                            >
                        <div className="rating">
                            
                        </div>
                        </CSSTransition>
                    </div>
                </div>
            </div>
        </>
    )
}

export default  BookCardPlaceholder;