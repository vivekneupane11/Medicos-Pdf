import React from 'react'
import { Headings } from '../../global/headings'
import { Avatar, Images } from '../../global/images'
import { Paragraphs } from '../../global/paragraphs'
import './_relatedStories.scss'

export const RelatedStories = ({relatedStories}) => {
    return (
        <div className="relatedStories-wrapper">
        <h2>Related stories</h2>
           {
               relatedStories.map((data) => {
                   return  <div className="relatedStories-wrapper-row">
                                <div className="relatedStories-wrapper-row-col1">
                                <Images Image={data.featurePhoto} />
                                </div>
                                <div className="relatedStories-wrapper-row-col2">
                                    <div className="relatedStories-wrapper-row-col2-content">
                                        <div className="storiesTitle">
                                        <Headings  type="heading3" color="#5e72e4" content={data.title}/>
                                        </div>
                                        <div className="storiesContent">
                                        <p>
                                            {data.content}
                                            <a href="#">Read More</a>
                                            
                                        </p>
                                        </div>
                                        <div className="authorProfile">
                                            <div className="authorProfile-col1">
                                                <Images type="circle" Image={data.authorImage} height={50} width={50}/>
                                            </div>
                                            <div className="authorProfile-col2">
                                                <div className="authorProfile-col2-authorName">
                                                    <Headings type="heading5" content={data.authorName}/>

                                                </div>
                                                <div className="aurthorProfile-col2-uploadDate">
                                                    <Paragraphs type="muted-text" content={data.UploadDate}/>

                                                </div>

                                            </div>

                                        </div>
                                        

                                    </div>

                                </div>

            </div>
               })
           }
            
        </div>
    )
}
