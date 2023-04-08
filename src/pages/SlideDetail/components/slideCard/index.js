import React, { useState, useContext } from 'react';
import { RiShareForwardFill } from "react-icons/ri";

import { GoComment } from "react-icons/go";

import { BsArrowsAngleExpand } from "react-icons/bs";
import { Paragraphs } from '../../../../components/global/paragraphs';
import { Headings } from '../../../../components/global/headings'
import { Link } from "react-router-dom";
import "./index.scss";
import { SlideDataContext } from '../../../Slide';
import {
    EmailShareButton,
    FacebookMessengerShareButton,
    FacebookShareButton,
    TwitterShareButton,
    TwitterIcon,
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,

} from "react-share";
import { logEventWithParams } from '../../../../functions/commonMethod';

const SlideCard = ({ title, description, images, wholeDatas, datas }) => {
    const [checkShare, setCheckShare] = useState(false)
    const slidesWholeData = useContext(SlideDataContext)
    // console.log('from slideCard:', slidesWholeData)
    const ShareUrl = encodeURI(`https://medicospdf.com/slideDetails/${datas?.SlideName}/${datas?.slideCategory}/${datas?.slideSubCategory.replace(/\s|\//g, "")}`);
    let dividedPortion = 100 / images.filter((data, index) => (index < 5))?.length;
    const [activeSlide, setActiveSlide] = useState(0);
    // const [onHover, setOnHover] = useState(0);
    const [progressValue, setProgressValue] = useState(dividedPortion);

    const progressPercentage = (event) => {
        let elementWidth = event.currentTarget.offsetWidth;
        let widthPercentage = (event.nativeEvent.offsetX / elementWidth) * 100;
        if (widthPercentage >= (dividedPortion * (activeSlide + 1))) {
            if (activeSlide < images?.length - 1) {
                setActiveSlide(activeSlide + 1);
                setProgressValue((activeSlide + 2) * dividedPortion)
            }

        } else if (widthPercentage < (dividedPortion * (activeSlide))) {
            if (activeSlide > 0) {
                setActiveSlide(activeSlide - 1);
                setProgressValue((activeSlide) * dividedPortion)
            }

        }
    }
    const removeUnderscore=(str)=> {
        var i, frags = str.split('_');
        for (i=0; i<frags.length; i++) {
          frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
        }
        return frags.join(' ');
      }
    return (
        <div className="slide-card">
            <Link
                onClick={() => logEventWithParams("web_slide_opened", {
                    slideTitle: title,
                    slideCategory: datas.slideCategory,
                    slideSubCategory: datas.slideSubCategory,
                })}
                className="slide-links"
                style={{ textDecoration: 'none' }}
                to={{
                    pathname: `/slideDetails/${datas?.SlideName}/${datas?.slideCategory}/${datas?.slideSubCategory.replace(/\s|\//g, "")}`,
                    state: {
                        data: JSON.stringify(datas),
                        wholeData: JSON.stringify(slidesWholeData),
                    }
                }}>
                <div
                    className="slide-card-image-container"
                    onMouseOut={() => setActiveSlide(0)}
                    onMouseMove={(event) => progressPercentage(event)}
                >

                    {images?.map((image, index) => {
                        if (activeSlide == index) {
                            return <img
                                key={index}
                                src={image}
                                alt={description}
                                className="slide-card-image"
                            />
                        }
                    })}

                    <div className="progress-indicator-container">
                        <div className="progress-indicator-container-active" style={{ width: progressValue + "%" }}></div>
                    </div>
                </div>

            </Link>

            <div className="slide-card-bottom">
                <div className="description">
                    <Link
                        onClick={() => logEventWithParams("web_slide_opened", {
                            slideTitle: title,
                            slideCategory: datas?.slideCategory,
                            slideSubCategory: datas?.slideSubCategory
                        })}
                        className="slide-links"
                        style={{ textDecoration: 'none' }}
                        to={{
                            pathname: `/slideDetails/${datas?.SlideName}/${datas?.slideCategory}/${datas?.slideSubCategory.replace(/\s|\//g, "")}`,
                            state: {
                                data: JSON.stringify(datas),
                                wholeData: JSON.stringify(slidesWholeData),
                            }
                        }}>
                        <div className="title">
                            <Headings type="heading5" content={removeUnderscore(description)} />
                        </div>
                        <Paragraphs content={title} />
                    </Link>
                </div>
                <div className="slide-info">
                    <div className="left">
                        <div className="userInfo">
                            <img className="profilePic" src={datas?.userAvatar ? datas?.userAvatar : require("../../../../assets/images//slide/medicos.png").default} alt='MedicosPdf logo' />
                            <Headings type="heading7" content={datas?.userEmail ? datas?.userEmail.replace(/@gmail.com/g,'') : "Medicos Int'l"} />
                         
                        </div>
                    </div>
                    <div className="right">
                        <div className="right-comment-icon">
                            <GoComment className="icon" />
                       
                        </div>
                       
                        <div className="shareOptions">
                            <RiShareForwardFill className="shareIcon" onClick={() => setCheckShare(!checkShare)} />
                            <div className={`sharePopUp ${checkShare ? 'sharePopUpActive' : ''}`}>
                                <FacebookShareButton
                                    url={ShareUrl}
                                    quote={datas?.SlideName}
                                    className="shareBtn"
                                >
                                    <FacebookIcon size={32} round />
                                </FacebookShareButton>

                                <FacebookMessengerShareButton
                                    appId={process.env.REACT_APP_ID}
                                    url={ShareUrl}
                                    title={datas?.SlideName}
                                    className="shareBtn"
                                >
                                    <FacebookMessengerIcon size={32} round />
                                </FacebookMessengerShareButton>

                                <TwitterShareButton
                                    url={ShareUrl}
                                    title={datas?.SlideName}
                                    className="shareBtn"
                                >
                                    <TwitterIcon size={32} round />
                                </TwitterShareButton>

                                <EmailShareButton
                                    body={ShareUrl}
                                    subject={datas?.SlideName}
                                    className="shareBtn"
                                >
                                    <EmailIcon size={32} round />
                                </EmailShareButton>

                            </div>
                        </div>
                        <Link
                            onClick={() => logEventWithParams("web_slide_opened", {
                                slideTitle: title,
                                slideCategory: datas?.slideCategory,
                                slideSubCategory: datas?.slideSubCategory
                            })}
                            to={{
                                pathname: `/slideDetails/${datas?.SlideName}/${datas?.slideCategory}/${datas?.slideSubCategory.replace(/\s|\//g, "")}`,
                                state: {
                                    data: JSON.stringify(datas),
                                    wholeData: JSON.stringify(slidesWholeData),
                                }
                            }}>
                            <BsArrowsAngleExpand className="downloadIcon" />
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default React.memo(SlideCard) ;
