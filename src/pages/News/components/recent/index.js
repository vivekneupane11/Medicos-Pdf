import React from 'react'

import './_recent.scss'
import AuthorDateRead from '../author-date-readTime'
import { logEventWithParams } from '../../../../functions/commonMethod'
import shortid from  "shortid";
const Recent = ({ detailsRight }) => {
    const newTab = (url,title) => {
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
        const textLength = text?.split(" ").length;
        let minutesToRead = Math.ceil(textLength / wordsPerMinute);
        return minutesToRead;

    };

    return (
        <>
            <div className="newsRecent-wrapper">
                <div className="newsRecent-wrapper-left" style={{ backgroundImage: `url(${detailsRight[3]['media:thumbnail']?.$?.url})` }}>

                    <div className="newsRecent-wrapper-left-mid">
                        
                        <h3 className="newsRecent-wrapper-left-mid-head"><a onClick={() => newTab(detailsRight[3]?.link, detailsRight[3]?.title)}>{detailsRight[3]?.title}</a></h3>
                        <AuthorDateRead link={detailsRight[3]?.link} date={new Date(detailsRight[3]?.isoDate).toDateString()} readTime={getReadingTime(detailsRight[3]?.content) + 'min read'} color='#fff' fontSize='12px' />
                    </div>

                </div>

                <div className="newsRecent-wrapper-right">
                    <h1 className="newsRecent-wrapper-right-head">latest News</h1>
                    <div className="newsRecent-wrapper-right-description">
                        {detailsRight?.filter((data, index) => index > 5 && index < 11).map((data, index) => (
                            <div key={shortid.generate()} className="newsRecent-wrapper-right-description-wrapper">
                                <h3 className="newsRecent-wrapper-right-description-wrapper-head" onClick={() => newTab(data?.link, data?.title)}>{data?.title}</h3>
                                <AuthorDateRead link={data.link} date={new Date(data.isoDate).toDateString()} readTime={getReadingTime(data?.content) + 'min read'} color='#9f9f9f' fontSize='12px' />
                            </div>
                        ))}


                    </div>

                </div>

            </div>

        </>
    )
}

export default Recent
