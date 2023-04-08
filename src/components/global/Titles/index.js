import React from 'react'
import './_displayTitles.scss'

export function DisplayTitle(props) {
    const render_DisplayTitletype =()=>{
        switch (props.type) {
            case 'display1':
                return  <h1 className={`display ${props.type}`} style={{color:props.color}}>{props.title}</h1>
            case 'display2':
                return  <h2 className={`display ${props.type}`} style={{color:props.color}}>{props.title}</h2>
            case 'display3':
                return  <h3 className={`display ${props.type}`} style={{color:props.color}}>{props.title}</h3>
            case 'display4':
                return  <h4 className={`display ${props.type}`} style={{color:props.color}}>{props.title}</h4>
            }
    }
   
    return (

        <div>
            {render_DisplayTitletype()}
        </div>
    )
}


