import React from 'react'
import { Link } from 'react-router-dom'
import './_featureBlogCard.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGift } from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'
import NewsLinkTag from '../newsLinkTag'
import { logEventWithParams } from '../../../functions/commonMethod'


const FeatureBlogCard = ({ details, source }) => {

    const getColorsByIndex = (index) => {
        let color = "yellow";
        if (index % 3 == 0) {
            color = 'red'
        } else if (index % 2 == 0) {
            color = 'skyblue'
        }
        return color;
    }

    const newTab = (url, title) => {
        window.open(url, "_blank");
        logEventWithParams('web_news_detail_page_opened', { newsTitle: title })

    }
    return (
        <>
            <div className="featureBlogCard-container">
                <div className={`featureBlogCard-container-wrapper`}>
                    <Link
                        style={{ textDecoration: 'none' }}
                        to={{
                            pathname: `/articleDetails/${details?.title?.rendered}/${source}`,
                        }}>
                        <img className="featureBlogCard-container-wrapper-picture" alt='img' src={details?.image?.source_url} />
                    </Link>

                    <div className={`featureBlogCard-container-wrapper-topic`}>
                        {/* <FontAwesomeIcon className="icon" icon={faGift} />
                        <p>{details?.slug}</p> */}
                        <NewsLinkTag color={getColorsByIndex(15)} tag={details?.slug} />

                    </div>
                    <Link
                        style={{ textDecoration: 'none' }}
                        to={{
                            pathname: `/articleDetails/${details?.title?.rendered}/${source}`,
                        }}>
                        <div className={`featureBlogCard-container-wrapper-content`}>
                            <h5>{details?.title?.rendered}</h5>
                            <p dangerouslySetInnerHTML={{ __html: details?.excerpt?.rendered }}></p>


                        </div>
                    </Link>
                    <div className={`featureBlogCard-container-wrapper-footer`}>
                        <div onClick={() => newTab(details?.link)} className="featureBlogCard-container-wrapper-footer-user-info">
                            <img className="featureBlogCard-container-wrapper-footer-user-info-picture" src='https://medschoolinsiders.com/wp-content/uploads/2020/05/cropped-MSI-Logo-Website-Banner-2020.png' alt="MedSchool insiders logo" />
                            {/* <div className="featureBlogCard-container-wrapper-footer-user-info-text">
                                <p>Johana Doe</p>
                               
                            </div> */}
                        </div>
                        <div className="featureBlogCard-container-wrapper-footer-button-container">

                            <FontAwesomeIcon icon={faCalendarAlt} className="featureBlogCard-container-wrapper-footer-button-container-icon" />
                            <p className="featureBlogCard-container-wrapper-footer-button-container_para">{new Date(details.date).toDateString()}</p>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default FeatureBlogCard