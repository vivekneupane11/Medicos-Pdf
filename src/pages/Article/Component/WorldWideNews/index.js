import React from 'react'
import NewsLinkTag from '../../../../components/global/newsLinkTag'
import AuthorDateRead from '../../../News/components/author-date-readTime'
import { Link } from 'react-router-dom'
import './_worldwide.scss'
import TextClamp from 'react-string-clamp';
import { logEventWithParams } from '../../../../functions/commonMethod'
import shortid from  "shortid";
const WorldWideNews = ({ details, sourceDocId}) => {

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
        <>
            <div className="worldwide-wrapper">
                <h3 className="worldwide-wrapper-head1">For You</h3>
        
                <div className="worldwide-wrapper-imagesContainer">
                    {details.filter((data, index) => index < 6).map((data, index) => (
                        <div key={shortid.generate()} className="worldwide-wrapper-imagesContainer-bgImg" style={{ backgroundImage: `url(${data?.image?.source_url})` }}>
                            <div className="worldwide-wrapper-imagesContainer-bgImg-description">
                                <NewsLinkTag color={getColorsByIndex(index)} tag={data?.slug} />
                                <Link
                                    onClick={() => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })}
                                    style={{ textDecoration: 'none' }}
                                    to={{
                                        pathname: `/articleDetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                                    }}>
                                    <h3 className="worldwide-wrapper-imagesContainer-bgImg-description-heading">{data?.title?.rendered}</h3>
                                </Link>
                                <TextClamp
                                    text={data?.excerpt?.rendered.replace(/<p[^>]*>/g && /<\/?p[^>]*>/g, "")}
                                    line={3}
                                    element='p'
                                    className="clamped_text"
                                />
                               
                                <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadingTime(data?.content?.rendered) + " min read"} color='#fff' fontSize='12px' />
                            </div>
                        </div>
                    ))}
                </div>

            </div>



        </>
    )
}

export default WorldWideNews
