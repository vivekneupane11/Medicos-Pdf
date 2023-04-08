import React from 'react';
import './_button.scss';
import UploadIcon from '../icons/uploadIcon';

export function Button(props) {
  const className = `button ${props.type}`
  return (
    <div className="button-a">
      <button className={className} >

        {props.icon && <UploadIcon className='uploadIcon' />}
        <p style={{ color: props.labelColor && props.labelColor }}>{props.label}</p>



      </button>
    </div>
  );
}
