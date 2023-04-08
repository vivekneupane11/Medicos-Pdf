import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import './_bookpad.scss';

export const BookPad = ({Image,Author,Rating,Heading}) => {
    return (
        <div className="bookpad-wrapper">
            <img className="cover-page" src={Image?.default}></img>
            <div className="heading">{Heading}</div>
            <div className="author-detials">{Author}</div>
            <div className="rating"> <FontAwesomeIcon className="star" icon={faStar} /> {Rating} </div>
            
        </div>
    )
}

