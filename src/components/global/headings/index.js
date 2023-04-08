import React from 'react'
import './_headings.scss'

export function Headings(props) {
    const renderHeadingType=()=>{
        switch(props.type)
        {
            case 'heading1':
                return <h1 className={`headingText ${props.type} `} style={{color:props.color}}>{props.content}</h1>
            case 'heading2':
                return <h2 className={`headingText ${props.type} `} style={{color:props.color}}>{props.content}</h2>
            case 'heading3':
                return <h3 className={`headingText ${props.type} `} style={{color:props.color}}>{props.content}</h3>
            case 'heading4':
                return <h4 className={`headingText ${props.type} `} style={{color:props.color}}>{props.content}</h4>
            case 'heading5':
                return <h5 className={`headingText ${props.type} `} style={{color:props.color}}>{props.content}</h5>
            case 'heading6':
                return <h6 className={`headingText ${props.type} ${props.active?'activeLinksCategoryColor':''} `} style={{color:props.color}}>{props.content}</h6>
            case 'heading7':
                return <h6 className={`headingText ${props.type} `} style={{color:props.color}}>{props.content}</h6>     
        }

    }

    return (
        <div>
            {renderHeadingType()}
        </div>
        
    )
}

