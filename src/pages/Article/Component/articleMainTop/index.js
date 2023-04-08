import React from 'react';
import { Link } from 'react-router-dom';
import shortid from "shortid";
import NewsLinkTag from '../../../../components/global/newsLinkTag';
import { logEventWithParams } from '../../../../functions/commonMethod';
import AuthorDateRead from '../../../News/components/author-date-readTime';
import './_articleMainTop.scss';

export const MainTop = ({ mainTopDetails, sourceDocId }) => {

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
        <div className="mainTop-wrapper">
            <div className="mainTop">
                <div className="mainTop-col1">{
                    mainTopDetails?.filter((data, index) => index < 2).map((data, index) => {
                        return <div key={shortid.generate()} className="mainTop-col1-content">
                            <Link
                                onClick={() => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })}
                                style={{ textDecoration: 'none' }}
                                to={{
                                    pathname: `/articleDetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`

                                }}>
                                <div className="mainTop-col1-content-image" style={{ backgroundImage: `url(${data?.image?.source_url})` }}></div>
                            </Link>
                            <div className="mainTop-col1-content-bottom">
                                <NewsLinkTag color={getColorsByIndex(index)} tag={data?.slug} />
                                <Link
                                    onClick={() => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })}
                                    style={{ textDecoration: 'none' }}
                                    to={{
                                        pathname: `/articleDetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                                    }}>
                                    <h3 className="mainTop-col1-content-bottom-heading">{data?.title?.rendered}</h3>
                                </Link>
                                <p style={{ fontSize: '18px', marginBottom: '10px' }}>{data?.excerpt?.rendered.replace(/<p[^>]*>/g && /<\/?p[^>]*>/g, "")}</p>


                                <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadingTime(data?.content?.rendered) + " min read"} color='#9f9f9f' fontSize='12px' />

                            </div>

                        </div>


                    })
                }

                </div>

                <div className="mainTop-col2">
                    {
                        mainTopDetails?.filter((data, index) => index === 2).map((data, index) => {
                            return <div key={shortid.generate()} className="mainTop-col2-content">
                                <Link
                                    onClick={() => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })}
                                    style={{ textDecoration: 'none' }}
                                    to={{
                                        pathname: `/articleDetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`

                                    }}>
                                    <div className="mainTop-col2-content-image" style={{ backgroundImage: `url(${data?.image?.source_url})` }}>

                                    </div>
                                </Link>
                                <div className="mainTop-col2-content-bottom">
                                    <NewsLinkTag color={getColorsByIndex(index)} tag={data?.slug} />
                                    <Link
                                        onClick={() => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })}
                                        style={{ textDecoration: 'none' }}
                                        to={{
                                            pathname: `/articleDetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                                        }}>
                                        <h3 className="mainTop-col2-content-bottom-heading">{data?.title?.rendered}</h3>
                                    </Link>
                                    <p style={{ fontSize: '18px', marginBottom: '10px' }}>{data?.excerpt?.rendered.replace(/<p[^>]*>/g && /<\/?p[^>]*>/g, "")}</p>
                                    <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadingTime(data?.content?.rendered) + " min read"} color='#9f9f9f' fontSize='12px' />

                                    {/* <Link
                                        onClick={() => logEventWithParams('web_article_detail_page_opened')}
                                        style={{ textDecoration: 'none' }}
                                        to={{
                                            pathname: `/articleDetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                                        }}>
                                        <Button type="primary" label="Read More" />
                                    </Link> */}
                                </div>

                            </div>
                        })
                    }

                </div>

                <div className="mainTop-col3">
                    {
                        mainTopDetails?.filter((data, index) => index > 2 && index < 5).map((data, index) => {
                            return <div key={shortid.generate()} className="mainTop-col3-content">
                                <Link
                                    onClick={() => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })}
                                    style={{ textDecoration: 'none' }}
                                    to={{
                                        pathname: `/articleDetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                                    }}>
                                    <div className="mainTop-col3-content-image" style={{ backgroundImage: `url(${data?.image?.source_url})` }}>

                                    </div>
                                </Link>
                                <div className="mainTop-col3-content-bottom">
                                    <NewsLinkTag color={getColorsByIndex(index)} tag={data?.slug} />
                                    <Link
                                        onClick={() => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })}
                                        style={{ textDecoration: 'none' }}
                                        to={{
                                            pathname: `/articleDetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                                        }}>
                                        <h3 className="mainTop-col3-content-bottom-heading">{data?.title?.rendered}</h3>
                                    </Link>
                                    <p style={{ fontSize: '18px', marginBottom: '10px' }}>{data?.excerpt?.rendered.replace(/<p[^>]*>/g && /<\/?p[^>]*>/g, "")}</p>
                                    <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadingTime(data?.content?.rendered) + " min read"} color='#9f9f9f' fontSize='12px' />


                                </div>

                            </div>
                        })
                    }



                </div>

            </div>


        </div>
    )
}
