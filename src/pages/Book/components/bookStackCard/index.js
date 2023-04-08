import React, { useState } from 'react';
import loaderImage from '../../../../assets/images/book/loaderpdf.webp';
import checkIfImageExists from '../../../../functions/checkImageValidity';
import { logEventWithParams } from '../../../../functions/commonMethod';
import './_bookStackCard.scss';
import StarFill from '../../../../components/global/icons/star_fill';
import { LazyLoadImage } from 'react-lazy-load-image-component';


const BookStackCard = ({ data = null, bookImage, title, authorInfo, rating, views }) => {

    const [state,setState]=useState(false)

    const clickhandlertodo = () => {
        logEventWithParams("web_book_opened", { book_title: title, book_subcategory: data && data?.subject })
    }
    
    useState(()=>{
        let isMounted=true
        if(isMounted){
            checkIfImageExists(bookImage, (exists) => {
                if (exists) {
                   setState(!state)
                } else {
                }
              });

        }
          return () => {
            isMounted=false
        }
      },[])

    return (
        <div
            // TODO
            onClick={clickhandlertodo}
            className="bookStackCard-wrapper">
            <div className="bookStackCard-wrapper-infoCard">
                <h6 className="bookStackCard-wrapper-infoCard-heading">{title}</h6>
                <p className="bookStackCard-wrapper-infoCard-p">by {authorInfo} (author)</p>
                <div className="bookStackCard-wrapper-infoCard-bottom">
                    <div className="bookStackCard-wrapper-infoCard-bottom-col1">
                        <StarFill className="bookStackCard-wrapper-infoCard-bottom-col1-icon" />
                        <h6 className="bookStackCard-wrapper-infoCard-bottom-col1-heading">{rating}</h6>
                    </div>
                    <p className="bookStackCard-wrapper-infoCard-bottom-p"></p>
                </div>
            </div>
            <div className="bookStackCard-wrapper-bookCoverCard">
                {/* <img 
                src={`${state?`${bookImage}`:`${loaderImage}`}`}
                alt={`${state?`${title}`:'MedicosPdf default book image'}`}
                /> */}
                <LazyLoadImage  src={`${state?`${bookImage}`:`${loaderImage}`}`}
                alt={`${state?`${title}`:'MedicosPdf default book image'}`} effect='blur'/>
            </div>

        </div>
    )
}

export default BookStackCard
