import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { CSSTransition} from 'react-transition-group';
import loaderImage from '../../../../assets/images/book/loaderpdf.webp';
import './_bookstackCardPlaceholder.scss';

export const BookStackCardPlaceholderPlaceholder = () => {
    return (
        <div className='bookStackCardPlaceholder-wrapper'>
            
            <div className="bookStackCardPlaceholder-wrapper-infoCard">
            <CSSTransition
             classNames="placeholder"
            in={true}
            appear={true}
            timeout={3000}
            >
            <p className="bookStackCardPlaceholder-wrapper-infoCard-heading"></p>

            </CSSTransition>
            <CSSTransition
             classNames="placeholder"
            in={true}
            appear={true}
            timeout={3000}
            >
                <p className="bookStackCardPlaceholder-wrapper-infoCard-heading"></p>
                </CSSTransition>
                <CSSTransition
             classNames="placeholder"
            in={true}
            appear={true}
            timeout={3000}
            >
                <p className="bookStackCardPlaceholder-wrapper-infoCard-p"> </p>
                </CSSTransition>
                <div className="bookStackCardPlaceholder-wrapper-infoCard-bottom">
                <CSSTransition
             classNames="placeholder"
            in={true}
            appear={true}
            timeout={3000}
            >
                    <div className="bookStackCardPlaceholder-wrapper-infoCard-bottom-col1">
                    </div>
                    </CSSTransition>
                    <CSSTransition
             classNames="placeholder"
            in={true}
            appear={true}
            timeout={3000}
            >
                    <p className="bookStackCardPlaceholder-wrapper-infoCard-bottom-p"></p>
                    </CSSTransition>
                </div>
        </div>
            
       
            <div className="bookStackCardPlaceholder-wrapper-bookCoverCard">
               {/* <img src={loaderImage} alt="coverimage"/> */}
               <LazyLoadImage src={loaderImage} alt="coverimage"/>
            </div>
            
        </div>
    )
}
