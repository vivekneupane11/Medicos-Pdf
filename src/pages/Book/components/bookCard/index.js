import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import loaderImage from '../../../../assets/images/book/loaderpdf.png';
import { Headings } from '../../../../components/global/headings';
import "./index.scss";

const BookCard = ({ book=null,image, title, author, rating, }) => {
    // console.log("This is book",book)

    const [state,setState]=useState(false)
    const  checkIfImageExists=(url, callback) =>{
        const img = new Image();
    
        img.src = url;
    
        if (img.complete) {
          callback(true);
        } else {
          img.onload = () => {
            callback(true);
          };
          
          img.onerror = () => {
            callback(false);
          };
        }
      }
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
                <img src={`${state?`${image}`:`${loaderImage}`}`} alt={`${state?`${title}`:'MedicosPdf default book image'}`} className="book-card-container-img" />
                <div className="book-card-container-content">
                    <Headings type="heading6" content={title} />
                    <p>{author}</p>
                    <div className="book-card-container-content-rating">
                        <FontAwesomeIcon icon={faStar} className="icon" />
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