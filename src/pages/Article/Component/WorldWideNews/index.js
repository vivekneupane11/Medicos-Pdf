import React from 'react'
import NewsLinkTag from '../../../../components/global/newsLinkTag'
import AuthorDateRead from '../../../News/components/author-date-readTime'
import { Link } from 'react-router-dom'
import './_worldwide.scss'
import TextClamp from 'react-string-clamp';
import { logEventWithParams } from '../../../../functions/commonMethod'
import shortid from  "shortid";
import { getColorByIndex, getReadTime } from '../../../../functions/tagColorAndReadTimeMethod'

const WorldWideNews = ({ details, sourceDocId}) => {

    return (
        <>
            <div className="worldwide-wrapper">
                <h3 className="worldwide-wrapper-head1">For You</h3>
        
                <div className="worldwide-wrapper-imagesContainer">
                    {details.filter((data, index) => index < 6).map((data, index) => (
                        <div key={shortid.generate()} className="worldwide-wrapper-imagesContainer-bgImg" style={{ backgroundImage: `url(${data?.image?.source_url})` }}>
                            <div className="worldwide-wrapper-imagesContainer-bgImg-description">
                                <NewsLinkTag color={getColorByIndex(index)} tag={data?.slug} />
                                <Link
                                    onClick={() => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })}
                                    className='links'
                                    to={{
                                        pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                                    }}>
                                    <h3 className="worldwide-wrapper-imagesContainer-bgImg-description-heading">{data?.title?.rendered}</h3>
                                </Link>
                                <TextClamp
                                    text={data?.excerpt?.rendered.replace(/<p[^>]*>/g && /<\/?p[^>]*>/g, "")}
                                    line={3}
                                    element='p'
                                    className="clamped_text"
                                />
                               
                                <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadTime(data?.content?.rendered) + " min read"} color='#fff' fontSize='12px' />
                            </div>
                        </div>
                    ))}
                </div>

            </div>



        </>
    )
}

export default WorldWideNews
