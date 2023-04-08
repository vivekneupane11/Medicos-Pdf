import React, { useState } from 'react';
import loaderImage from '../../../../assets/images/book/loadertrending.webp';
import { Headings } from '../../../../components/global/headings';
import "./index.scss";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import 'react-lazy-load-image-component/src/effects/blur.css';
import checkIfImageExists from '../../../../functions/checkImageValidity';
import StarFill from '../../../../components/global/icons/star_fill';
const BookCard = ({ book=null,image, title, author, rating, }) => {

    const [state,setState]=useState(false)
  
      useState(()=>{
        checkIfImageExists(image, (exists) => {
            if (exists) {
               setState(!state)
            } else {
            }
          });

      },[])
      
     
    return (
        <>
            <div className="book-card-container">
            <LazyLoadImage
                alt={`${state?`${title}`:'MedicosPdf default book image'}`}
                effect="blur"
                src={`${state?`${image}`:`${loaderImage}`}`}
                className="book-card-container-img"
                />
     
                <div className="book-card-container-content">
                    <Headings type="heading6" content={title} />
                    <p className="book-card-container-content-para">{author}</p>
                    <div className="book-card-container-content-rating">
                        <StarFill className="icon" />
                        <div className="rating">
                            <Headings type="heading6" content={rating} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo( BookCard);