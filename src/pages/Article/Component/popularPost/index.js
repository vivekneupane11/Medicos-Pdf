import React from 'react'
import { Link } from 'react-router-dom'
import NewsLinkTag from '../../../../components/global/newsLinkTag';
import { logEventWithParams } from '../../../../functions/commonMethod';
import AuthorDateRead from '../../../News/components/author-date-readTime';
import './_popular.scss';
import shortid from  "shortid";
export const PopularPost = ({ popular,popularPostSourceDocId}) => {
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
        <div className="popularPost-wrapper">
            <h3> Popular Posts</h3>
            <div className="popularPost">
                {
                    popular.filter((data, index) => index > 7).map((data, index) => {
                        return <div key={shortid.generate()} className="popularPost-content">
                            <Link
                                onClick={() => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })}
                                style={{ textDecoration: 'none' }}
                                to={{
                                    pathname: `/articleDetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${popularPostSourceDocId}`
                                }}>
                                <div className="popularPost-content-image" style={{ backgroundImage: `url(${data?.image?.source_url})` }}>
                                </div>
                            </Link>
                            <div className="popularPost-content-bottom">
                                <NewsLinkTag color={getColorsByIndex(index)} tag={data?.slug} />
                                <Link
                                    onClick={() => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })}
                                    style={{ textDecoration: 'none' }}
                                    to={{
                                        pathname: `/articleDetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${popularPostSourceDocId}`
                                    }}>
                                    <h3 className="popularPost-content-bottom-heading">{data?.title?.rendered}</h3>
                                </Link>
                                <p style={{ fontSize: '18px', marginBottom: '10px' }}>{data?.excerpt?.rendered.replace(/<p[^>]*>/g && /<\/?p[^>]*>/g, "")}</p>
                                <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadingTime(data?.content?.rendered) + " min read"} color='#9f9f9f' fontSize='12px' />


                            </div>

                        </div>
                    })
                }


            </div>

        </div>
    )
}
