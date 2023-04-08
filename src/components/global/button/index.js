import React from 'react';
import './_button.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
//import classes from './Button.module.css';

export function Button(props) {
  const className = `button ${props.type}`
  return (
    <div className="button-a">
      <button className={className} >

        {props.icon && <FontAwesomeIcon style={{ marginRight: '5px' }} icon={faUpload} />}
        <p style={{ color: props.labelColor && props.labelColor }}>{props.label}</p>



      </button>
    </div>
  );
}
