import React from 'react'
import './_error404.scss';
import background from '../../../images/error.jpg';

export const Error404 = () => {
 
    return (
        <div className="error404-wrapper" style={{backgroundImage:`url(${background})`}}>
            <div >
            <p className="error404-wrapper-heading">404</p>
            
            <div className="error404-wrapper-description">
            <p>Page not found :(</p>
            <p>Ooooops!Looks like you got lost </p>
            </div>

            </div>
            
        </div>
    )
}
