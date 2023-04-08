import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import shortid from "shortid"
import news from '../../../../assets/images/news/news.jpg'
import { newsLastWholeSectionDetails } from '../../../../components/constants/mock'
import { logEventWithParams } from '../../../../functions/commonMethod'
import AuthorDateRead from '../author-date-readTime'
import './_lastWholeSection.scss'

const LastWholeSection = ({ details }) => {

    const newTab = (url,title) => {
        window.open(url, "_blank");
        logEventWithParams('web_article_detail_page_opened',{articleTitle: title});
    }
    const getReadingTime = (text) => {
        const wordsPerMinute = 120;
        const textLength = text.split(" ").length;
        let minutesToRead = Math.ceil(textLength / wordsPerMinute);
        return minutesToRead;

    };

    const getColorsByIndex = (index) => {
        let color = "yellow";
        if (index % 3 == 0) {
            color = 'red'
        } else if (index % 2 == 0) {
            color = 'skyblue'
        }
        return color;
    }



    return (
        <>

            <div className="newsLastWholeSection-container">

                <div className="newsLastWholeSection-container-left">
                    {
                        details?
                            <div className="newsLastWholeSection-container-left-topImg" style={{ backgroundImage: `url(${details[3]['media:content']?.$?.url?.includes('.jpg') ? `${details[3]['media:content']?.$?.url}` : `${news}`})` }}>
                                <div className="newsLastWholeSection-container-left-topImg-description">
                                   
                                    <h3 className="newsLastWholeSection-container-left-topImg-description-head" onClick={() => newTab(details[3].link,details[3]?.title)}>{details[3]?.title}</h3>
                                    <AuthorDateRead date={new Date(details[3]?.isoDate).toDateString()} readTime={getReadingTime(details[3]?.content) + " min read"} color='#fff' fontSize='12px' />
                                </div>
                            </div>
                            :
                            ''
                    }

                    <div className="newsLastWholeSection-container-left-bottomContainer">
                        {details?.filter((data, index) => index > 3 && index < 18).map((data, index) => (
                            <div key={shortid.generate()} className="newsLastWholeSection-container-left-bottomContainer-singleCard">
                                <div onClick={() => newTab(data?.link,data?.title)} className="newsLastWholeSection-container-left-bottomContainer-singleCard-img" style={{ backgroundImage: `url(${data['media:content']?.$?.url.includes('.jpg') ? `${data['media:content'].$?.url}` : `${news}`})` }}>
                                   
                                </div>
                                <div className="newsLastWholeSection-container-left-bottomContainer-singleCard-description">
                                   
                                    <h3 className="newsLastWholeSection-container-left-bottomContainer-singleCard-description-head" onClick={() => newTab(data?.link,data?.title)} >{data?.title}</h3>
                                    <AuthorDateRead date={new Date(data?.isoDate).toDateString()} readTime={getReadingTime(data?.content) + " min read"} color='#9f9f9f' fontSize='12px' />
                                </div>
                                <p className="newsLastWholeSection-container-left-bottomContainer-singleCard-para">{data?.content}</p>
                            </div>

                        ))}

                    </div>

                </div>

                <div className="newsLastWholeSection-container-right">

                    <div className="newsLastWholeSection-container-right-latestPostsContainer">
                        <h3 className="newsLastWholeSection-container-right-latestPostsContainer-head">Latest posts</h3>
                        <div className="newsLastWholeSection-container-right-latestPostsContainer-cardsContainer">
                            {details?.filter((data, index) => index > 17 && index < 21).map((data, index) => (
                                <div key={shortid.generate()} className="newsLastWholeSection-container-right-latestPostsContainer-cardsContainer-card">
                                    <div onClick={() => newTab(data?.link,data?.title)} className="newsLastWholeSection-container-right-latestPostsContainer-cardsContainer-card-img" style={{ backgroundImage: `url(${data['media:content']?.$?.url})` }}>
                                        
                                    </div>
                                    <div className="newsLastWholeSection-container-right-latestPostsContainer-cardsContainer-card-description">
                                        
                                        <h3 className="newsLastWholeSection-container-right-latestPostsContainer-cardsContainer-card-description-head" onClick={() => newTab(data?.link,data?.title)}>{data?.title}</h3>
                                        <AuthorDateRead date={new Date(data?.isoDate).toDateString()} readTime={getReadingTime(data?.content) + " min read"} color='#9f9f9f' fontSize='12px' />
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>

                    <div className="newsLastWholeSection-container-right-individualDetailsContainer">
                        <div className="newsLastWholeSection-container-right-individualDetailsContainer-description">
                            <h6 className="newsLastWholeSection-container-right-individualDetailsContainer-description-head">Hello, I'm {newsLastWholeSectionDetails.col2individualIntro.name}
                                <div className="newsLastWholeSection-container-right-individualDetailsContainer-description-head-img" style={{ backgroundImage: `url(${newsLastWholeSectionDetails.col2individualIntro.bgImage})` }}>
                                </div>
                            </h6>
                            <p className="newsLastWholeSection-container-right-individualDetailsContainer-description-para"> {newsLastWholeSectionDetails.col2individualIntro.para}</p>
                            <button className="newsLastWholeSection-container-right-individualDetailsContainer-description-btn"><a href={newsLastWholeSectionDetails.col2individualIntro.aboutmelink}>About me</a></button>
                        </div>


                    </div>

                    <div className="newsLastWholeSection-container-right-popularContainer">
                        <h3 className="newsLastWholeSection-container-right-popularContainer-head">Popular</h3>
                        <div className="newsLastWholeSection-container-right-popularContainer-cardsContainer">
                            {details?.filter((data, index) => index > 45 && index < 49).map((data, index) => (
                                <div className="newsLastWholeSection-container-right-popularContainer-cardsContainer-card" key={shortid.generate()}>
                                    <div onClick={() => newTab(data?.link,data?.title)} className="newsLastWholeSection-container-right-popularContainer-cardsContainer-card-img" style={{ backgroundImage: `url(${data['media:content']?.$?.url.includes('.jpg') ? `${data['media:content'].$?.url}` : `${news}`})` }}></div>
                                    <div className="newsLastWholeSection-container-right-popularContainer-cardsContainer-card-description">
                                        <h3 className="newsLastWholeSection-container-right-popularContainer-cardsContainer-card-description-head" onClick={() => newTab(data?.link,data?.title)}>{data?.title}</h3>
                                        <AuthorDateRead date={new Date(data?.isoDate).toDateString()} readTime={getReadingTime(data?.content) + " min read"} color='#9f9f9f' fontSize='12px' />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="newsLastWholeSection-container-right-subscribeAndFollowContainer">
                        <h3 className="newsLastWholeSection-container-right-subscribeAndFollowContainer-head">Subscribe and Follow</h3>
                        <div className="newsLastWholeSection-container-right-subscribeAndFollowContainer-cardsContainer">
                            {newsLastWholeSectionDetails.col2subscribeAndfollow.map((data, index) => (
                                <div key={shortid.generate()} className="newsLastWholeSection-container-right-subscribeAndFollowContainer-cardsContainer-card" style={{ backgroundColor: `${data.bgColor}` }}>
                                    <div className="newsLastWholeSection-container-right-subscribeAndFollowContainer-cardsContainer-card-link" onClick={() => newTab(data.socialmedialink,data?.socialmedianame)}>
                                        <div className="newsLastWholeSection-container-right-subscribeAndFollowContainer-cardsContainer-card-link-wrapper">
                                            <h5 className="newsLastWholeSection-container-right-subscribeAndFollowContainer-cardsContainer-card-link-wrapper-head">{data.socialmedianame}</h5>
                                            <p className="newsLastWholeSection-container-right-subscribeAndFollowContainer-cardsContainer-card-link-wrapper-para">{data.likes}</p>
                                        </div>
                                        <FontAwesomeIcon icon={data.logo} className="newsLastWholeSection-container-right-subscribeAndFollowContainer-cardsContainer-card-link-icon" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}

export default LastWholeSection
