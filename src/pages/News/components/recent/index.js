import React from 'react'

import './_recent.scss'
import AuthorDateRead from '../author-date-readTime'
// import { logEventWithParams } from '../../../../functions/commonMethod'
import shortid from  "shortid";
import { getReadTime } from '../../../../functions/tagColorAndReadTimeMethod';
import { newTab } from '../../../../functions/newTabMethod';
const Recent = ({ detailsRight }) => {
 

    return (
        <>
            <div className="newsRecent-wrapper">
                <div className="newsRecent-wrapper-left" style={{ backgroundImage: `url(${detailsRight[3]['media:thumbnail']?.$?.url})` }}>

                    <div className="newsRecent-wrapper-left-mid">
                        
                        <h3 className="newsRecent-wrapper-left-mid-head"><a onClick={() => newTab(detailsRight[3]?.link, detailsRight[3]?.title,'web_article_detail_page_opened')}>{detailsRight[3]?.title}</a></h3>
                        <AuthorDateRead link={detailsRight[3]?.link} date={new Date(detailsRight[3]?.isoDate).toDateString()} readTime={getReadTime(detailsRight[3]?.content) + 'min read'} color='#fff' fontSize='12px' />
                    </div>

                </div>

                <div className="newsRecent-wrapper-right">
                    <h1 className="newsRecent-wrapper-right-head">latest News</h1>
                    <div className="newsRecent-wrapper-right-description">
                        {detailsRight?.filter((data, index) => index > 5 && index < 11).map((data, index) => (
                            <div key={shortid.generate()} className="newsRecent-wrapper-right-description-wrapper">
                                <h3 className="newsRecent-wrapper-right-description-wrapper-head" onClick={() => newTab(data?.link, data?.title,'web_article_detail_page_opened')}>{data?.title}</h3>
                                <AuthorDateRead link={data.link} date={new Date(data.isoDate).toDateString()} readTime={getReadTime(data?.content) + 'min read'} color='#9f9f9f' fontSize='12px' />
                            </div>
                        ))}


                    </div>

                </div>

            </div>

        </>
    )
}

export default React.memo(Recent)
