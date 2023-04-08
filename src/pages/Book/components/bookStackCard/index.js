import React from 'react'
import './_bookStackCard.scss'
import firebase from "firebase";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { logEventWithoutParams, logEventWithParams } from '../../../../functions/commonMethod'

const BookStackCard = ({ data = null, bookImage, title, authorInfo, rating, views }) => {
    // console.log("This is book data", data && data);
    return (
        <div
            // TODO
            onClick={() => {
                logEventWithParams("web_book_opened", { book_title: title, book_subcategory: data && data?.subject })
            }}
            className="bookStackCard-wrapper">
            <div className="bookStackCard-wrapper-infoCard">
                <h6 className="bookStackCard-wrapper-infoCard-heading">{title}</h6>
                <p className="bookStackCard-wrapper-infoCard-p">by {authorInfo} (author)</p>
                <div className="bookStackCard-wrapper-infoCard-bottom">
                    <div className="bookStackCard-wrapper-infoCard-bottom-col1">
                        <FontAwesomeIcon icon={faStar} className="bookStackCard-wrapper-infoCard-bottom-col1-icon" />
                        <h6 className="bookStackCard-wrapper-infoCard-bottom-col1-heading">{rating}</h6>
                    </div>
                    <p className="bookStackCard-wrapper-infoCard-bottom-p"></p>
                </div>
            </div>
            <div className="bookStackCard-wrapper-bookCoverCard">
                <img src={bookImage} alt={title} />
            </div>

        </div>
    )
}

export default BookStackCard
