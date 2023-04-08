import React from 'react'
import NewsLinkTag from '../../../../components/global/newsLinkTag'
// import { logEventWithParams } from '../../../../functions/commonMethod'
import './_categories.scss'
import shortid from "shortid";
import { getColorByIndex } from '../../../../functions/tagColorAndReadTimeMethod';
import { newTab } from '../../../../functions/newTabMethod';
const Categories = ({ details }) => {

    return (
        <>
            <div className="newsCategories-wrapper">

                <div className="newsCategories-wrapper-imgContainer">
                    {details?.filter((data, index) => index > 9 && index < 14).map((data, index) => (
                        <div key={shortid.generate()} className="newsCategories-wrapper-imgContainer-bgImg" style={{ backgroundImage: `url(${data['media:content'].$?.url})` }} >

                            <div className="newsCategories-wrapper-imgContainer-bgImg-mid">
                                <div className="newsCategories-wrapper-imgContainer-bgImg-mid-postNo">5 posts</div>
                                <NewsLinkTag color={getColorByIndex(index)} tag={data?.creator} />
                                <div className="newsCategories-wrapper-imgContainer-bgImg-mid-btn"><a onClick={() => newTab(data?.link, data?.title,'web_news_detail_page_opened')}>View posts</a></div>
                            </div>
                            <div className="overlay" style={{ backgroundColor: `${getColorByIndex(index)}` }}></div>


                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default React.memo(Categories)
