import React from 'react';
import { Link } from 'react-router-dom';
import shortid from "shortid";

//local imports
import NewsLinkTag from '../../../../components/global/newsLinkTag';
import { logEventWithParams } from '../../../../functions/commonMethod';
import AuthorDateRead from '../../../News/components/author-date-readTime';
import './_markets.scss';
export const Markets = ({ markets, sourceDocId}) => {
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
        <div className="markets-wrapper">
            <h3 className="markets-wrapper-heading">Guide to Medical Journey</h3>
            <div className="markets-wrapper-content">
                {
                    markets.filter((data, index) => index < 8).map((data, index) => {
                        return <div className="markets-wrapper-content-item" key={shortid.generate()}>
                            <NewsLinkTag color={getColorsByIndex(index)} tag={data?.slug} />
                            <Link
                                onClick={() => logEventWithParams('web_article_detail_page_opened',{articleTitle: data?.title?.rendered})}
                                style={{ textDecoration: 'none' }}
                                to={{
                                    pathname: `/articleDetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                                }}>
                                <h3 className="markets-wrapper-content-item-heading">{data?.title?.rendered}</h3>
                            </Link>
                            <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadingTime(data?.content?.rendered) + " min read"} color='#9f9f9f' fontSize='12px' />
                        </div>

                    })
                }
            </div>

        </div>
    )
}
