import React from 'react'
import NewsLinkTag from '../../../../components/global/newsLinkTag'
import AuthorDateRead from '../../../News/components/author-date-readTime'
import bgImage1 from '../../../../assets/images/popup.jpg';
import './_inHypeBusiness.scss'
import { Button } from '../../../../components/global/button';

export const InHypeBusiness = ({InHype}) => {

    return (
        <div className="inHypeBusiness-wrapper">
            <h3>InHype Business</h3>
            <div className="inHypeBusiness">
            {
                InHype.map((data,index)=>
                {
                    return  <div key={index} className="inHypeBusiness-content">
                    <div className="inHypeBusiness-content-image"  style={{backgroundImage:`url(${data.background})`}}>
                    </div>
                    <div className="inHypeBusiness-content-bottom">
                    <NewsLinkTag color={data.tagColor} tag={data.tagName} link={'/#456'} />
                        <h3 className="inHypeBusiness-content-bottom-heading">{data.heading}</h3>
                        <AuthorDateRead  date='September 19,2019' readTime='4 Min read' color='#9f9f9f' fontSize='12px'/>
                    </div>

                </div>
                })
            }
            
            </div>
            <div  className="inHypeBusiness-wrapper-button">
                <Button type="primary" label="Read More"/>
            </div>
            
        </div>
    )
}
