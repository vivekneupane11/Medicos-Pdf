import React from 'react'
import { Images } from '../../../../components/global/images'
import './_slideCardWithDetail.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import { BiCommentDetail } from "react-icons/bi";
import {IoAlbumsSharp ,IoPlayCircleOutline} from "react-icons/io5";
import { Headings } from '../../../../components/global/headings';
import { Paragraphs } from '../../../../components/global/paragraphs';

export const SlideCardWithDetail = ({slideImage1,slideImage2,slideImage3,slides}) => {
    return (
        <div className="slide">
        <div className="slide-image">
            <div className="slide-image1">
            <Images Image={slideImage1} width={260} height={230} />
            </div>
            <div className="slide-image2">
            <Images Image={slideImage2} width={260} height={230}/>

            </div>
            <div className="slide-image3">
            <Images Image={slideImage3} width={260} height={230}/>
            </div>
            <div className="playbutton">
            <IoPlayCircleOutline />
            </div>
            <div className="slide_tooltip">
                <IoAlbumsSharp/>
                <p>15 slides</p>
            </div>

        </div>
       
       
        
        {slides.map((slide) => {
                    return <div className={`content-box`}>
                            
                            <div className="social-container">
                                <div className="slide-like">
                                    <FontAwesomeIcon className="slide-like-icon" icon={faHeart} />
                                    {/* <p>{slide.likes} likes</p> */}
                                </div>
                                <div className="slide-comment"> 
                                <BiCommentDetail className="slide-comment-icon"/>
                                {/* <p>{slide.comments} comments</p> */}
                                </div>
                               
                                <div className="time">
                                <p>{slide.time} hour ago</p>
                                </div>
                                <div className="slide-views">
                                <p>{slide.views} views</p>

                                </div>
                            </div>
                            <div className="slide-description">
                                <div className="slide-description-heading">
                                    <Headings type="heading5" content="11th_12th Cranial Nerves"/>
                                </div>
                                <div className="slide-description-content">
                                    <Paragraphs content="Welcome to Medicos PDF, May your best source for all
                                     health-related subject.
                                     We’re dedicated to providing you the very best information about health "/>
                                </div>

                            </div>
                        </div>

                })}

        
            
        </div>
    )
}
