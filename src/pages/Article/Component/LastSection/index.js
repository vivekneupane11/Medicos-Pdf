import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import shortid from "shortid";

//local imports
import NewsLinkTag from '../../../../components/global/newsLinkTag';
import { logEventWithParams } from '../../../../functions/commonMethod';
import { getColorByIndex, getReadTime } from '../../../../functions/tagColorAndReadTimeMethod';
import AuthorDateRead from '../../../News/components/author-date-readTime';
import { LatestPost } from '../latestPost';
import { PopularPost } from '../popularPost';
import { SocialFollow } from '../SocialFollow';
import './_lastsection.scss';



export const LastSection = ({ 
    lastsecCol1,
    lastsecCol1SourceDocId,
     latestPost, 
     latestPostSourceDocId,
     popularPost,
     popularPostSourceDocId
    }) => {

    const shuffle = (array) => {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    useEffect(() => {
        shuffle(lastsecCol1);

    }, [lastsecCol1])


    return (
        <div className="lastSection-wrapper">
            <div className="lastSection">
                <div className="lastSection-col1">
                    {
                        shuffle(lastsecCol1) &&
                        lastsecCol1.filter((data, index) => index === 0).map((data, index) => {

                            return <div key={shortid.generate()} className="lastSection-col1-content">
                                <Link
                                    onClick={() => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })}
                                    style={{ textDecoration: 'none' }}
                                    to={{
                                        pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${lastsecCol1SourceDocId}`
                                    }}>
                                    <div className="lastSection-col1-content-image" style={{ backgroundImage: `url(${data?.image?.source_url})` }}>
                                        <div className="lastSection-col1-content-image-play">

                                        </div>
                                    </div>
                                </Link>
                                <div className="lastSection-col1-content-bottom">
                                    <NewsLinkTag color={getColorByIndex(index)} tag={data?.slug} />
                                    <Link
                                        onClick={() => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })}
                                        style={{ textDecoration: 'none' }}
                                        to={{
                                            pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${lastsecCol1SourceDocId}`
                                        }}>
                                        <h3 className="lastSection-col1-content-bottom-heading">{data?.title?.rendered}</h3>
                                    </Link>
                                    <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadTime(data?.content?.rendered) + " min read"} color='#9f9f9f' fontSize='12px' />
                                    <p className='content'>{data?.excerpt?.rendered.replace(/<p[^>]*>/g && /<\/?p[^>]*>/g, "")}</p>
                                   
                                </div>

                            </div>
                        })
                    }
                    <div>
                        {
                            shuffle(lastsecCol1) &&
                            lastsecCol1.filter((data, index) => index > 0).map((data, index) => {

                                const clickhandlerwebpagedetail5 = () => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })
                                const clickhandlerwebpagedetail6 = () => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })
                                return <div key={shortid.generate()} className="lastSection-col1-row">

                                    <Link
                                        onClick={clickhandlerwebpagedetail5}
                                        className="article-lastSection-link"
                                        to={{
                                            pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${lastsecCol1SourceDocId}`
                                        }}>
                                        <div className="lastSection-col1-row-image" style={{ backgroundImage: `url(${data?.image?.source_url})` }}>

                                        </div>
                                    </Link>


                                    <div className="lastSection-col1-row-bottom">
                                        <NewsLinkTag color={getColorByIndex(index)} tag={data?.slug} />
                                        <Link
                                            onClick={clickhandlerwebpagedetail6}
                                            style={{ textDecoration: 'none' }}
                                            to={{
                                                pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${lastsecCol1SourceDocId}`
                                            }}>
                                            <h3 className="lastSection-col1-row-bottom-heading">{data?.title?.rendered}</h3>
                                        </Link>

                                        <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadTime(data?.content?.rendered) + " min read"} color='#9f9f9f' fontSize='12px' />
                                        <p className='content'>{data?.excerpt?.rendered.replace(/<p[^>]*>/g && /<\/?p[^>]*>/g, "")}</p>
                                       

                                    </div>

                                </div>
                            })
                        }
                    </div>


                </div>
                <div className="lastSection-col2">
                    <LatestPost latestPostSourceDocId={latestPostSourceDocId} latestPost={latestPost} />
                    <PopularPost popularPostSourceDocId={popularPostSourceDocId} popular={popularPost}  />
                    <SocialFollow />



                </div>
            </div>

        </div>
    )
}
