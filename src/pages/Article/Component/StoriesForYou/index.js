import React from 'react'
import { Link } from 'react-router-dom'
import NewsLinkTag from '../../../../components/global/newsLinkTag';
import { logEventWithParams } from '../../../../functions/commonMethod';
import AuthorDateRead from '../../../News/components/author-date-readTime';
import './_storiesForYou.scss';
import shortid from  "shortid";
import { getColorByIndex, getReadTime } from '../../../../functions/tagColorAndReadTimeMethod';

export const StoriesForYou = ({ stories, sourceDocId}) => {


    return (
        <div className="storiesForYou-wrapper">
            <h3>Health Related Articles</h3>
            <div className="storiesForYou">
                {
                    stories.filter((data, index) => index > 5 && index < 10).map((data, index) => {

                        const clickhandlerwebpageart8 = () => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })
                        const clickhandlerwebpageart9 = () => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })
                        return <div key={shortid.generate()} className="storiesForYou-content">
                            <Link
                                onClick={clickhandlerwebpageart8}
                                className='link'
                                to={{
                                    pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                                }}>
                                <div className="storiesForYou-content-image" style={{ backgroundImage: `url(${data?.image?.source_url})` }}></div>
                            </Link>
                            <div className="storiesForYou-content-bottom">
                                <NewsLinkTag color={getColorByIndex(index)} tag={data?.slug} />
                                <Link
                                    onClick={clickhandlerwebpageart9}
                                    className='link'
                                    to={{
                                        pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                                    }}>
                                    <h3 className="storiesForYou-content-bottom-heading">{data?.title?.rendered}</h3>
                                </Link>
                                <p className='content'>{data?.excerpt?.rendered.replace(/<p[^>]*>/g && /<\/?p[^>]*>/g, "")}</p>
                                <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadTime(data?.content?.rendered) + " min read"} color='#9f9f9f' fontSize='12px' />


                            </div>

                        </div>
                    })
                }


            </div>

        </div>
    )
}
