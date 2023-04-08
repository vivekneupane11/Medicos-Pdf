import React from 'react';
import shortid from "shortid";
import NewsLinkTag from '../../../../components/global/newsLinkTag';
import { logEventWithParams } from '../../../../functions/commonMethod';
import AuthorDateRead from '../author-date-readTime';
import './_technology.scss';
const Technology = ({ details }) => {

    const newTab = (url, title) => {
        window.open(url, "_blank");
        logEventWithParams('web_news_detail_page_opened', { newsTitle: title })
    }
    const getReadingTime = (text) => {
        const wordsPerMinute = 120;
        const textLength = text.split(" ").length;
        let minutesToRead = Math.ceil(textLength / wordsPerMinute);
        return minutesToRead;

    };

    const getColorsByIndex = (index) => {
        let color = "yellow";
        if (index % 3 == 0) {
            color = 'red'
        } else if (index % 2 == 0) {
            color = 'skyblue'
        }
        return color;
    }
    return (
        <>
            <div className="newsTechnology-wrapper">
                <h3 className="newsTechnology-wrapper-head1">Guide for Medical Journey</h3>
                <h6 className="newsTechnology-wrapper-head2">Top of The week News</h6>

                <div className="newsTechnology-wrapper-cardsContainer">
                    {details?.filter((data, index) => index < 6).map((data, index) => (
                        <div key={shortid.generate()} className="newsTechnology-wrapper-cardsContainer-card">
                            <div onClick={() => newTab(data?.link, data?.title)} className="newsTechnology-wrapper-cardsContainer-card-img" style={{ backgroundImage: `url(${data?.image?.url[0]})` }}>
                           

                            </div>

                            <div className="newsTechnology-wrapper-cardsContainer-card-tags">
                               
                                <NewsLinkTag color={getColorsByIndex(index)} tag={data?.categories[0]} />

                            </div>

                            <h3 onClick={() => newTab(data?.link, data?.title)} className="newsTechnology-wrapper-cardsContainer-card-head">{data?.title}</h3>

                            <div className="newsTechnology-wrapper-cardsContainer-card-dateread">
                                <AuthorDateRead date={new Date(data?.pubDate).toDateString()} readTime={getReadingTime(data?.contentSnippet) + " min read"} color='#9f9f9f' fontSize='12px' />
                            </div>
                            <p className="newsTechnology-wrapper-cardsContainer-card-para">{data?.contentSnippet}</p>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default Technology
