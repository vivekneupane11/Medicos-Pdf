import React from 'react'
import './_newsLinks.scss'
import NewsLinkTag from '../../../../components/global/newsLinkTag'
import AuthorDateRead from '../author-date-readTime'
import { logEventWithParams } from '../../../../functions/commonMethod'
import shortid from  "shortid";
const NewsLinks = ({ details }) => {

    const newTab = (url, title) => {
        window.open(
            url, "_blank");
        logEventWithParams('web_news_detail_page_opened', { newsTitle: title })
    }

    const getColorsByIndex = (index) => {
        let color = "yellow";
        if (index % 3 == 0) {
            color = 'red'
        } else if (index % 2 == 0) {
            color = 'skyblue'
        }
        return color;
    }

    const getReadingTime = (text) => {
        const wordsPerMinute = 120;
        const textLength = text.split(" ").length;
        let minutesToRead = Math.ceil(textLength / wordsPerMinute);
        return minutesToRead;

    };
    return (
        <div className='NewsLinks-container'>
            {details?.filter((data, index) => index < 4).map((data, index) => {
                return <div key={shortid.generate()} className="NewsLinks-container-wrapper">
                    <div className="NewsLinks-container-wrapper-newslinktags">

                        <div className="NewsLinks-container-wrapper-newslinktags-tag">
                            {/* <NewsLinkTag  color={getColorsByIndex(index)} tag={data?.title?.split(' ')[0]} /> */}
                            <NewsLinkTag color={getColorsByIndex(index)} tag={data?.categories[0]} />
                        </div>

                    </div>

                    <h3 className="NewsLinks-container-wrapper-heading" onClick={() => newTab(data?.link, data?.title)}>{data?.title}</h3>
                    <AuthorDateRead date={new Date(data.isoDate).toDateString()} readTime={getReadingTime(data?.contentSnippet)} color='#9f9f9f' fontSize='12px' />
                </div>
            })}

        </div>
    )
}

export default NewsLinks
