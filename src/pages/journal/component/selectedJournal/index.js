import React from 'react'
import NewsLinkTag from '../../../../components/global/newsLinkTag'
import AuthorDateRead from '../../../News/components/author-date-readTime'
import './_selectedJournal.scss'
import journal from '../../../../assets/images/journal/journ.jpg'
import { logEventWithParams } from '../../../../functions/commonMethod'
import shortid from  "shortid";
const SelectedJournal = ({ details }) => {
    const newTab = (url,title) => {
        window.open(
            url, "_blank");
        logEventWithParams('web_journals_detail_page_opened', { journalTitle: title })
    }
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
            {
                details &&

                <div className="selectedJournal-wrapper">
                    <h3 className="selectedJournal-wrapper-head1">Selected Journals</h3>
                    <h6 className="selectedJournal-wrapper-head2">EDITOR'S PICKS</h6>
                    <div className="selectedJournal-wrapper-infoContainer">
                        <div className="selectedJournal-wrapper-infoContainer-col1">
                            <div className="selectedJournal-wrapper-infoContainer-col1-tag">
                                <NewsLinkTag color={getColorsByIndex(0)} tag={details[0]?.creator} />
                            </div>
                            <h3 className="selectedJournal-wrapper-infoContainer-col1-head" onClick={() => newTab(details[0]?.link,details[0]?.title)}>{details[0]?.title}</h3>
                            <div className="selectedJournal-wrapper-infoContainer-col1-authordateread">
                                <AuthorDateRead author={details[0]?.author} authorColor='#9f9f9f' link={details[0]?.link} date={new Date(details[0]?.isoDate).toDateString()} readTime={getReadingTime(details[0]?.content) + " min read"} color='#9f9f9f' fontSize='12px' />
                            </div>
                            <p className="selectedJournal-wrapper-infoContainer-col1-para">{details[0]?.description}</p>

                            <div className="selectedJournal-wrapper-infoContainer-col1-bottom">
                                {details?.filter((data, index) => index > 2 && index < 5).map((data, index) => {
                                    let time_to_read = getReadingTime(data.content) + ' min read'
                                    return <div key={shortid.generate()} className="selectedJournal-wrapper-infoContainer-col1-bottom-description">
                                        <div className="selectedJournal-wrapper-infoContainer-col1-bottom-description-img" style={{ backgroundImage: `url(${'https://images.journals.lww.com/academicmedicine/XLargeThumb.00001888-202109000-00000.CV.jpeg'})` }} >
                                        </div>
                                        <h3 className="selectedJournal-wrapper-infoContainer-col1-bottom-description-head" onClick={() => newTab(data?.link,data?.title)}>{data.title}</h3>
                                        <AuthorDateRead author={data?.creator} link={data.link} date={new Date(data.isoDate).toDateString()} readTime={time_to_read} color='#9f9f9f' fontSize='12px' />
                                    </div>
                                })}

                            </div>

                        </div>

                        <div className="selectedJournal-wrapper-infoContainer-col2">
                            {details?.filter((data, index) => index >= 10 && index <= 13).map((data, index) => {
                                let time_to_read = getReadingTime(data.content) + ' min read'
                                return <div key={shortid.generate()} className="selectedJournal-wrapper-infoContainer-col2-description">
                                    <NewsLinkTag color={getColorsByIndex(index)} tag={data?.creator} />
                                    <h3 className="selectedJournal-wrapper-infoContainer-col2-description-head" onClick={() => newTab(data?.link,data?.title)}>{data.title}</h3>
                                    <AuthorDateRead author={data?.creator} link={data.link} date={new Date(data.isoDate).toDateString()} readTime={time_to_read} color='#9f9f9f' fontSize='12px' />
                                </div>
                            })}


                        </div>

                        <div className="selectedJournal-wrapper-infoContainer-col3">
                            <div className="selectedJournal-wrapper-infoContainer-col3-img" style={{ backgroundImage: `url(${journal})` }} >
                            </div>
                            <div className="selectedJournal-wrapper-infoContainer-col3-desc">
                                <div className="selectedJournal-wrapper-infoContainer-col3-desc-tag">
                                    <NewsLinkTag color={getColorsByIndex(15)} tag={details[15]?.creator} />
                                </div>
                                <h3 className="selectedJournal-wrapper-infoContainer-col3-desc-head" onClick={() => newTab(details[15]?.link,details[15]?.title)} >{details[15]?.title}</h3>
                                <AuthorDateRead author={details[15]?.creator} link={details[15]?.link} date={new Date(details[15]?.isoDate).toDateString()} readTime={getReadingTime(details[15]?.content) + "min read"} color='#9f9f9f' fontSize='12px' />
                            </div>

                        </div>
                    </div>
                </div>
            }


        </>
    )
}

export default SelectedJournal
