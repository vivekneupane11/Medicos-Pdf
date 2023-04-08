import React from 'react'
import { Link } from 'react-router-dom'
import NewsLinkTag from '../../../../components/global/newsLinkTag';
import { logEventWithParams } from '../../../../functions/commonMethod';
import AuthorDateRead from '../../../News/components/author-date-readTime';
import './_popular.scss';
import shortid from  "shortid";
import { getColorByIndex, getReadTime } from '../../../../functions/tagColorAndReadTimeMethod';
export const PopularPost = ({ popular,popularPostSourceDocId}) => {
  
    return (
        <div className="popularPost-wrapper">
            <h3> Popular Posts</h3>
            <div className="popularPost">
                {
                    popular.filter((data, index) => index > 7 && index < 15).map((data, index) => {

                        const clickhandlerwebpageart3 = () => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })
                        const clickhandlerwebpageart4 = () => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })
                        return <div key={shortid.generate()} className="popularPost-content">
                            <Link
                                onClick={clickhandlerwebpageart3}
                                className='link'
                                to={{
                                    pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${popularPostSourceDocId}`
                                }}>
                                <div className="popularPost-content-image" style={{ backgroundImage: `url(${data?.image?.source_url})` }}>
                                </div>
                            </Link>
                            <div className="popularPost-content-bottom">
                                <NewsLinkTag color={getColorByIndex(index)} tag={data?.slug} />
                                <Link
                                    onClick={clickhandlerwebpageart4}
                                    className='link'
                                    to={{
                                        pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${popularPostSourceDocId}`
                                    }}>
                                    <h3 className="popularPost-content-bottom-heading">{data?.title?.rendered}</h3>
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
