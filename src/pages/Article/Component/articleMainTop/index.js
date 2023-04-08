import React from 'react';
import { Link } from 'react-router-dom';
import shortid from "shortid";
import NewsLinkTag from '../../../../components/global/newsLinkTag';
import { logEventWithParams } from '../../../../functions/commonMethod';
import { getColorByIndex, getReadTime } from '../../../../functions/tagColorAndReadTimeMethod';
import AuthorDateRead from '../../../News/components/author-date-readTime';
import './_articleMainTop.scss';

 const MainTop = ({ mainTopDetails, sourceDocId }) => {

 
    return (
        <div className="mainTop-wrapper">
            <div className="mainTop">
                <div className="mainTop-col1">{
                    mainTopDetails?.filter((data, index) => index < 2).map((data, index) => {

                        
                    const clickhandlerlogevent = () => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })
                    const clickhandlerarticle = () => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })
                        return <div key={shortid.generate()} className="mainTop-col1-content">
                            <Link
                                onClick={clickhandlerlogevent}
                                style={{ textDecoration: 'none' }}
                                to={{
                                    pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`

                                }}>
                                <div className="mainTop-col1-content-image" style={{ backgroundImage: `url(${data?.image?.source_url})` }}></div>
                            </Link>
                            <div className="mainTop-col1-content-bottom">
                                <NewsLinkTag color={getColorByIndex(index)} tag={data?.slug} />
                                <Link
                                    onClick={clickhandlerarticle}
                                    style={{ textDecoration: 'none' }}
                                    to={{
                                        pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                                    }}>
                                    <h3 className="mainTop-col1-content-bottom-heading">{data?.title?.rendered}</h3>
                                </Link>
                                <p className='content'>{data?.excerpt?.rendered.replace(/<p[^>]*>/g && /<\/?p[^>]*>/g, "")}</p>


                                <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadTime(data?.content?.rendered) + " min read"} color='#9f9f9f' fontSize='12px' />

                            </div>

                        </div>


                    })
                }

                </div>

                <div className="mainTop-col2">
                    {
                        mainTopDetails?.filter((data, index) => index === 2).map((data, index) => {
                            const clickhandlerarticletitle = () => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })
                            const clickhandlerarticle2 = () => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })
                            return <div key={shortid.generate()} className="mainTop-col2-content">
                                <Link
                                    onClick={clickhandlerarticle2}
                                    style={{ textDecoration: 'none' }}
                                    to={{
                                        pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`

                                    }}>
                                    <div className="mainTop-col2-content-image" style={{ backgroundImage: `url(${data?.image?.source_url})` }}>

                                    </div>
                                </Link>
                                <div className="mainTop-col2-content-bottom">
                                    <NewsLinkTag color={getColorByIndex(index)} tag={data?.slug} />
                                    <Link
                                        onClick={clickhandlerarticletitle}
                                        style={{ textDecoration: 'none' }}
                                        to={{
                                            pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                                        }}>
                                        <h3 className="mainTop-col2-content-bottom-heading">{data?.title?.rendered}</h3>
                                    </Link>
                                    <p className='content'>{data?.excerpt?.rendered.replace(/<p[^>]*>/g && /<\/?p[^>]*>/g, "")}</p>
                                    <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadTime(data?.content?.rendered) + " min read"} color='#9f9f9f' fontSize='12px' />

                                
                                </div>

                            </div>
                        })
                    }

                </div>

                <div className="mainTop-col3">
                    {
                        mainTopDetails?.filter((data, index) => index > 2 && index < 5).map((data, index) => {

                            const clickhandlerlogwith = () => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })
                            const clickhandlerpageopen = () => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })
                            return <div key={shortid.generate()} className="mainTop-col3-content">
                                <Link
                                    onClick={clickhandlerlogwith}
                                    style={{ textDecoration: 'none' }}
                                    to={{
                                        pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                                    }}>
                                    <div className="mainTop-col3-content-image" style={{ backgroundImage: `url(${data?.image?.source_url})` }}>

                                    </div>
                                </Link>
                                <div className="mainTop-col3-content-bottom">
                                    <NewsLinkTag color={getColorByIndex(index)} tag={data?.slug} />
                                    <Link
                                        onClick={clickhandlerpageopen}
                                        style={{ textDecoration: 'none' }}
                                        to={{
                                            pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                                        }}>
                                        <h3 className="mainTop-col3-content-bottom-heading">{data?.title?.rendered}</h3>
                                    </Link>
                                    <p className='content'>{data?.excerpt?.rendered.replace(/<p[^>]*>/g && /<\/?p[^>]*>/g, "")}</p>
                                    <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadTime(data?.content?.rendered) + " min read"} color='#9f9f9f' fontSize='12px' />


                                </div>

                            </div>
                        })
                    }



                </div>

            </div>


        </div>
    )
}


export default React.memo(MainTop)