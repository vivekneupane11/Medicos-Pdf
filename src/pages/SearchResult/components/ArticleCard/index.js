import React from "react";
import { Link } from "react-router-dom";
import shortid from "shortid";
import NewsLinkTag from "../../../../components/global/newsLinkTag";
import { logEventWithParams } from "../../../../functions/commonMethod";
import { getColorByIndex, getReadTime } from "../../../../functions/tagColorAndReadTimeMethod";
import AuthorDateRead from "../../../News/components/author-date-readTime";
import './index.scss'


const ArticleCard = ({ index, data, sourceDocId }) => {

    // console.log('article IMAGE', data?.image?.source_url)

    const clickhandlerarticletitle = () => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })
    const clickhandlerarticletitle2 = () => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })
    return <div key={shortid.generate()} className="article-card-content">
        <Link
            onClick={clickhandlerarticletitle}
            className="links"
            to={{
                pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
            }}>
            <div className="article-card-content-image" style={{ backgroundImage: `url(${data?.image?.source_url})` }}></div>
        </Link>
        <div className="article-card-content-bottom">
            <NewsLinkTag color={getColorByIndex(index)} tag={data?.slug} />
            <Link
                onClick={clickhandlerarticletitle2}
                className="links"
                to={{
                    pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                }}>
                <h3 className="article-card-content-bottom-heading">{data?.title?.rendered}</h3>
            </Link>
            <p style={{ fontSize: '18px', marginBottom: '10px' }}>{data?.excerpt?.rendered.replace(/<p[^>]*>/g && /<\/?p[^>]*>/g, "")}</p>
            <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadTime(data?.content?.rendered) + " min read"} color='#9f9f9f' fontSize='12px' />
        </div>

    </div>
}

export default React.memo(ArticleCard);