import React from 'react'
import { Link } from 'react-router-dom'
import NewsLinkTag from '../../../../components/global/newsLinkTag';
import { logEventWithParams } from '../../../../functions/commonMethod';
import AuthorDateRead from '../../../News/components/author-date-readTime';
import './_selected.scss';
import shortid from  "shortid";
import { getColorByIndex, getReadTime } from '../../../../functions/tagColorAndReadTimeMethod';
export const Selected = ({ selected, sourceDocId}) => {
  

    return (
        <div className="selected-wrapper">
            <h3 className="selected-wrapper-heading">Recommended</h3>

            <div className="selected">


                <div className="selected-wrapper-content">
                    <div className="selected-wrapper-content-col1">
                        {
                            selected.filter((data, index) => index >= 5 && index <= 6).map((data, index) => (
                                <div key={shortid.generate()} className="selected-wrapper-content-col1-content">
                                    <Link
                                onClick={() => logEventWithParams('web_article_detail_page_opened',{articleTitle: data?.title?.rendered})}
                                        className="selected-link"
                                        to={{
                                            pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                                        }}>
                                        <div className="selected-wrapper-content-col1-content-image" style={{ backgroundImage: `url(${data?.image?.source_url})` }}>

                                        </div>
                                    </Link>
                                    <div className="selected-wrapper-content-col1-content-description">
                                        <div className="tags">
                                            <NewsLinkTag color={getColorByIndex(index)} tag={data?.slug} />
                                        </div>
                                        <Link
                                    onClick={() => logEventWithParams('web_article_detail_page_opened',{articleTitle: data?.title?.rendered})}
                                            style={{ textDecoration: 'none' }}
                                            to={{
                                                pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                                            }}>
                                            <h3 className="selected-wrapper-content-col1-content-description-heading" >{data?.title?.rendered}</h3>
                                        </Link>
                                        <p className='content'>{data?.excerpt?.rendered.replace(/<p[^>]*>/g && /<\/?p[^>]*>/g, "")}</p>
                                        <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadTime(data?.content?.rendered) + " min read"} color='#9f9f9f' fontSize='12px' />

                                    </div>


                                </div>

                            ))
                        }


                    </div>
                    <div className="selected-wrapper-content-col2">
                        <div className="selected-wrapper-content-col2-imagesContainer">
                            {selected.filter((data, index) => index >= 7 && index <= 8).map((data, index) => (
                                <div key={shortid.generate()} className="selected-wrapper-content-col2-imagesContainer-bgImg" style={{ backgroundImage: `url(${data?.image?.source_url})` }}>
                                    <div className="selected-wrapper-content-col2-imagesContainer-bgImg-description">
                                        <NewsLinkTag color={getColorByIndex(index)} tag={data?.slug} />
                                        <Link
                                    onClick={() => logEventWithParams('web_article_detail_page_opened',{articleTitle: data?.title?.rendered})}
                                            style={{ textDecoration: 'none', color: 'white' }}
                                            to={{
                                                pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                                            }}>
                                            <h3 className="selected-wrapper-content-col2-imagesContainer-bgImg-description-heading">

                                                {data?.title?.rendered}

                                            </h3>
                                        </Link>
                                        <p className='content'>{data?.excerpt?.rendered.replace(/<p[^>]*>/g && /<\/?p[^>]*>/g, "")}</p>
                                        <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadTime(data?.content?.rendered) + " min read"} color='#fff' fontSize='12px' />
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>


                </div>
            </div>








        </div>
    )
}
