import React from 'react';
import { Link } from 'react-router-dom';
import shortid from "shortid";
import NewsLinkTag from '../../../../components/global/newsLinkTag';
import { logEventWithParams } from '../../../../functions/commonMethod';
import { getColorByIndex, getReadTime } from '../../../../functions/tagColorAndReadTimeMethod';
import AuthorDateRead from '../../../News/components/author-date-readTime';
import './_latest.scss';

export const LatestPost = ({ latestPost,latestPostSourceDocId}) => {
  

    return (
        <div className="latestPost-wrapper">
            <h3 className="latestPost-wrapper-heading">Latest Posts</h3>
            <div className="latestPost-wrapper-content">
                {
                    latestPost.filter((data, index) => index === 9).map((data, index) => {

                        const clickhandlerwebpageart = () => logEventWithParams('web_article_detail_page_opened',{articleTitle: data?.title?.rendered})
                        return <div className="latestPost-wrapper-content-item" key={shortid.generate()}>
                            <NewsLinkTag color={getColorByIndex(index)} tag={data?.slug} />
                            <Link
                                onClick={clickhandlerwebpageart}
                               className='articleLink'
                                to={{
                                    pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${latestPostSourceDocId}`
                                }}>
                                <h3 className="latestPost-wrapper-content-item-heading">{data?.title?.rendered}</h3>
                            </Link>
                            <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadTime(data?.content?.rendered) + " min read"} color='#9f9f9f' fontSize='12px' />
                        </div>

                    })
                }
            </div>

        </div>
    )
}
