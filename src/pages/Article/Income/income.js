import React from 'react'
import { Link } from 'react-router-dom'
import NewsLinkTag from '../../../components/global/newsLinkTag'
import AuthorDateRead from '../../News/components/author-date-readTime'
import './_income.scss';
import TextClamp from 'react-string-clamp';
import {  logEventWithParams } from '../../../functions/commonMethod';
import shortid from  "shortid";
export const Income = ({ income, sourceDocId}) => {
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
        <div className="income-wrapper">
            <h3 className="income-wrapper-heading">Normal Routines</h3>
            <div className="income">

                {
                    income?.filter((data, index) => index > 3 && index < 8).map((data, index) => {
                        return <div key={shortid.generate()} className="income-wrapper-content">
                            <div className="income-wrapper-content-col1">
                                <Link
                                onClick={() => logEventWithParams('web_article_detail_page_opened',{articleTitle: data?.title?.rendered})}
                                    style={{ textDecoration: 'none' }}
                                    to={{
                                        pathname: `/articleDetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                                    }}>
                                    <div className="income-wrapper-content-col1-img" style={{ backgroundImage: `url(${data?.image?.source_url})` }}>

                                    </div>
                                </Link>
                            </div>
                            <div className="income-wrapper-content-col2">
                                <div className="income-wrapper-content-col2-tag">

                                    <NewsLinkTag color={getColorsByIndex(index)} tag={data?.slug} />

                                </div>
                                <Link
                                onClick={() => logEventWithParams('web_article_detail_page_opened',{articleTitle: data?.title?.rendered})}
                                    style={{ textDecoration: 'none' }}
                                    to={{
                                        pathname: `/articleDetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                                    }}>
                                    <h3 className="income-wrapper-content-col2-head">{data?.title?.rendered}</h3>
                                </Link>
                                <TextClamp
                                    text={data?.excerpt?.rendered.replace(/<p[^>]*>/g && /<\/?p[^>]*>/g, "")}
                                    lines={2}
                                    element='p'
                                    className="article-income-clamText"
                                />
                                <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadingTime(data?.content?.rendered) + " min read"} color='#9f9f9f' fontSize='12px' />


                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
