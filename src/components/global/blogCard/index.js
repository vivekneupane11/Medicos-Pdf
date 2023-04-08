import React from 'react'
import './_blogCard.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DisplayTitle } from '../../../components/global/Titles';

import TextClamp from 'react-string-clamp';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'

const BlogCard = ({ details }) => {

    return (
        <>
            <div className="blogCard-container">
                <div className={`blogCard-container-wrapper`}>
                    <div className={`blogCard-container-wrapper-topic`}>
                        {/* <FontAwesomeIcon className="icon" icon={faGift} /> */}


                        {/* <p>{details.creator}</p> */}
                    </div>
                    <div className={`blogCard-container-wrapper-content`}>
                        <h5>{details?.title}</h5>
                        <p>{details?.content}</p>
                    </div>
                    <div className={`blogCard-container-wrapper-footer`}>
                        <div className="blogCard-container-wrapper-footer-user-info">
                            <div className="blogCard-container-wrapper-footer-user-info-picture">
                                <DisplayTitle title={details?.creator?.substring(0, 1)} type="display4" />
                            </div>
                            <div className="blogCard-container-wrapper-footer-user-info-text">
                                {/* <p>Johana Doe</p> */}
                              {
                                  details?.creator &&
                                  <TextClamp
                                  text={details?.creator}
                                  line={1}
                                  element='p'
                              // className="newsLinkTag-link-text-p"
                              />
                              }
                            </div>
                        </div>
                        <div className="blogCard-container-wrapper-footer-button-container">
                            {/* <FontAwesomeIcon className="icon" icon={faBookmark} /> */}
                            {/* <div className="heart">
                                <FontAwesomeIcon className="icon" icon={faHeart} />
                                <p>10.4k</p>
                            </div>
                            <div className="bag">
                                <FontAwesomeIcon className="icon" icon={faShoppingBag} />
                                <p>425</p>
                            </div> */}
                            <FontAwesomeIcon icon={faCalendarAlt} />
                            <p className="blogCard-container-wrapper-footer-button-container_para">{new Date(details?.isoDate).toDateString()}</p>


                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default BlogCard