import React from 'react';
import { Link } from 'react-router-dom';
import shortid from "shortid";

//local imports
import NewsLinkTag from '../../../../components/global/newsLinkTag';
import { logEventWithParams } from '../../../../functions/commonMethod';
import { getColorByIndex, getReadTime } from '../../../../functions/tagColorAndReadTimeMethod';
import AuthorDateRead from '../../../News/components/author-date-readTime';
import './_markets.scss';
export const Markets = ({ markets, sourceDocId}) => {
  

    return (
        <div className="markets-wrapper">
            <h3 className="markets-wrapper-heading">Guide to Medical Journey</h3>
            <div className="markets-wrapper-content">
                {
                    markets.filter((data, index) => index < 8).map((data, index) => {

                        const clickhandlerwebpageart2 = () => logEventWithParams('web_article_detail_page_opened',{articleTitle: data?.title?.rendered})
                        return <div className="markets-wrapper-content-item" key={shortid.generate()}>
                            <NewsLinkTag color={getColorByIndex(index)} tag={data?.slug} />
                            <Link
                                onClick={clickhandlerwebpageart2}
                                className='link'
                                to={{
                                    pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                                }}>
                                <h3 className="markets-wrapper-content-item-heading">{data?.title?.rendered}</h3>
                            </Link>
                            <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadTime(data?.content?.rendered) + " min read"} color='#9f9f9f' fontSize='12px' />
                        </div>

                    })
                }
            </div>

        </div>
    )
}
