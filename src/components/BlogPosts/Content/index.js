import React from 'react'
import { Headings } from '../../global/headings';
import { Paragraphs, Quotes } from '../../global/paragraphs';
import './_content.scss';

export const TopContent = ({topContent}) => {
    return (
        <div className="topContent-wrapper">
            {
                topContent.map((Content)=>{
                    return <div className="topContent-card" key={Content}>
                <Headings type="heading6" content={Content.date}/>
                <Headings type="heading3" content={Content.title1}/>
                <Paragraphs type="lead-text-small" content={Content.paragraph1}/>
                {/* <Paragraphs type="lead-text-small" content="hello world hello world  "/> */}
                <br/>
                <br/>
                <Paragraphs type="lead-text-small" content={Content.paragraph2}/>
                <br/>

                <br/>
                <Quotes quote={Content.quote} author={Content.authorName}/>
                   <br/>
                   <br/>

                <Headings type="heading3" content={Content.title2}/>

                <Paragraphs type="lead-text-small" content={Content.title2_Paragraph}/>

                   
            </div>
                })
            }
            
        </div>
    )
}
