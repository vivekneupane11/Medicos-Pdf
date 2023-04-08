import React from 'react'
import { Link } from 'react-router-dom'
import { getReadTime } from '../../../../functions/tagColorAndReadTimeMethod'
import AuthorDateRead from '../../../News/components/author-date-readTime'
import './_trending.scss'
const Trending = ({ details, details2Source }) => {
    // let history = useHistory();
 
    const goTop = () => {
        // history.replace(`/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${details2Source}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
const handeltop=() => goTop()

    return (
        <>
            <div className="newsDetailTrending-wrapper">
                <h3 className="newsDetailTrending-wrapper-head">Trending</h3>
                <div className="newsDetailTrending-wrapper-description">
                    {details?.filter(( index) => index < 4).map((data, index) => {
                        return <div key={index} className="newsDetailTrending-wrapper-description-wrapper">
                              <Link
                        
                                    className='links'
                                    to={{
                                        pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${details2Source}`
                                    }}>
                                <div onClick={handeltop} className="newsDetailTrending-wrapper-description-wrapper-bgImg" style={{ backgroundImage: `url(${data?.image?.source_url})` }}>
                                </div>
                                </Link>

                                <Link
                        
                                    className='links'
                                    to={{
                                        pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${details2Source}`
                                    }}>
                                <h3 onClick={handeltop} className="newsDetailTrending-wrapper-description-wrapper-head">{data?.title?.rendered}</h3>
                               </Link>
                            <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadTime(data?.content?.rendered) + " min read"} color='#0f0e0e' fontSize='12px' />
                        </div>
                    }
                    )}
                </div>
            </div>

        </>
    )
}

export default Trending
