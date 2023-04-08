import React from 'react'
import { useHistory } from 'react-router-dom'
import AuthorDateRead from '../../../News/components/author-date-readTime'
import './_trending.scss'
const Trending = ({ details, details2Source }) => {
    let history = useHistory();
    const getReadingTime = (text) => {
        const wordsPerMinute = 120;
        const textLength = text.split(" ").length;
        let minutesToRead = Math.ceil(textLength / wordsPerMinute);
        return minutesToRead;

    };

    const newTab = (url) => {
        window.open(
            url, "_blank");
    }
    const goTop = (data) => {
        history.replace(`/articleDetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${details2Source}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return (
        <>
            <div className="newsDetailTrending-wrapper">
                <h3 className="newsDetailTrending-wrapper-head">Trending</h3>
                <div className="newsDetailTrending-wrapper-description">
                    {details?.filter((data, index) => index < 4).map((data, index) => {
                        {/* console.log("This is article", data); */}
                        return <div key={index} className="newsDetailTrending-wrapper-description-wrapper">
                                <div onClick={() => goTop(data)} className="newsDetailTrending-wrapper-description-wrapper-bgImg" style={{ backgroundImage: `url(${data?.image?.source_url})` }}>
                                </div>
                                <h3 onClick={() => goTop(data)} className="newsDetailTrending-wrapper-description-wrapper-head">{data?.title?.rendered}</h3>
                            <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadingTime(data?.content?.rendered) + " min read"} color='#0f0e0e' fontSize='12px' />
                        </div>
                    }
                    )}
                </div>
            </div>

        </>
    )
}

export default Trending
