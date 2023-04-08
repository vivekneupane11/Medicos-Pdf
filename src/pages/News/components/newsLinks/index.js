import React from 'react'
import './_newsLinks.scss'
import NewsLinkTag from '../../../../components/global/newsLinkTag'
import AuthorDateRead from '../author-date-readTime'
// import { logEventWithParams } from '../../../../functions/commonMethod'
import shortid from  "shortid";
import { getColorByIndex, getReadTime } from '../../../../functions/tagColorAndReadTimeMethod'
import { newTab } from '../../../../functions/newTabMethod'
const NewsLinks = ({ details }) => {

 
   
    return (
        <div className='NewsLinks-container'>
            {details?.filter(( index) => index < 4).map((data, index) => {
                return <div key={shortid.generate()} className="NewsLinks-container-wrapper">
                    <div className="NewsLinks-container-wrapper-newslinktags">

                        <div className="NewsLinks-container-wrapper-newslinktags-tag">
                            {/* <NewsLinkTag  color={getColorsByIndex(index)} tag={data?.title?.split(' ')[0]} /> */}
                            <NewsLinkTag color={getColorByIndex(index)} tag={data?.categories[0]} />
                        </div>

                    </div>

                    <h3 className="NewsLinks-container-wrapper-heading" onClick={ () => newTab(data?.link, data?.title,'web_article_detail_page_opened')}>{data?.title}</h3>
                    <AuthorDateRead date={new Date(data.isoDate).toDateString()} readTime={getReadTime(data?.contentSnippet)} color='#9f9f9f' fontSize='12px' />
                </div>
            })}

        </div>
    )
}
export default React.memo(NewsLinks)
