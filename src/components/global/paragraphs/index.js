import React from 'react'
import './_paragraphs.scss'

export function Paragraphs(props) {
    return (
        <div className="paragraph">
            <p className={props.type} style={{color:props.color}}>{props.content}</p>

        </div>
    )
}

export function Quotes(props) {
    return (
        <div className="QuotesBlock">
            <q className="quotes">{props.quote}</q>
            <p className="author">-{props.author}</p>
        </div>
    )
}

