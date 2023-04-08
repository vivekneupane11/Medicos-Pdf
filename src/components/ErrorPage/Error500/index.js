import React from 'react'
import './_error500.scss';
import background from '../../../images/error.jpg';

export const Error500 = () => {

    return (
        <div className="error500-wrapper" style={{backgroundImage:`url(${background})`}}>
            <div >
            <p className="error500-wrapper-heading">500</p>
            
            <div className="error500-wrapper-description">
            <p>Error:(</p>
            <p>We are sorry.This was Unexpected. </p>
            </div>

            </div>
            
        </div>
    )
}
