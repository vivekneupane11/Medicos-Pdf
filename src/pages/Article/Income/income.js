import React from 'react'
import { Link } from 'react-router-dom'
import NewsLinkTag from '../../../components/global/newsLinkTag'
import AuthorDateRead from '../../News/components/author-date-readTime'
import './_income.scss';
import TextClamp from 'react-string-clamp';
import {  logEventWithParams } from '../../../functions/commonMethod';
import shortid from  "shortid";
import { getColorByIndex, getReadTime } from '../../../functions/tagColorAndReadTimeMethod';
export const Income = ({ income, sourceDocId}) => {
 
    return (
        <div className="income-wrapper">
            <h3 className="income-wrapper-heading">Normal Routines</h3>
            <div className="income">

                {
                    income?.filter((data, index) => index > 3 && index < 8).map((data, index) => {


                        const clickhandlerwebpages6 = () => logEventWithParams('web_article_detail_page_opened',{articleTitle: data?.title?.rendered})
                        const clickhandlerwebpages7 = () => logEventWithParams('web_article_detail_page_opened',{articleTitle: data?.title?.rendered})
                        return <div key={shortid.generate()} className="income-wrapper-content">
                            <div className="income-wrapper-content-col1">
                                <Link
                                onClick={clickhandlerwebpages6}
                                    className='links'
                                    to={{
                                        pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                                    }}>
                                    <div className="income-wrapper-content-col1-img" style={{ backgroundImage: `url(${data?.image?.source_url})` }}>

                                    </div>
                                </Link>
                            </div>
                            <div className="income-wrapper-content-col2">
                                <div className="income-wrapper-content-col2-tag">

                                    <NewsLinkTag color={getColorByIndex(index)} tag={data?.slug} />

                                </div>
                                <Link
                                onClick={clickhandlerwebpages7}
                                    className='links'
                                    to={{
                                        pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                                    }}>
                                    <h3 className="income-wrapper-content-col2-head">{data?.title?.rendered}</h3>
                                </Link>
                                <TextClamp
                                    text={data?.excerpt?.rendered.replace(/<p[^>]*>/g && /<\/?p[^>]*>/g, "")}
                                    lines={2}
                                    element='p'
                                    className="article-income-clamText"
                                />
                                <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadTime(data?.content?.rendered) + " min read"} color='#9f9f9f' fontSize='12px' />


                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
