import React from 'react'
import { Headings } from '../../../components/global/headings';
import { Paragraphs } from '../../../components/global/paragraphs';
import './_post.scss';
import {AiOutlineRight} from 'react-icons/ai';
import {BsThreeDotsVertical} from 'react-icons/bs';
import { Images } from '../../../components/global/images';

export const Post = () => {
    return (
        <div className="post-wrapper">
            <div className="post-wrapper-top">
                <div className="post-wrapper-top-left">
                    <div className="post-wrapper-top-left-heading">
                        <Headings type="heading5" content="Posts"/>
                    </div>
                    <div className="post-wrapper-top-left-view">
                    <div className="post-wrapper-top-left-view-heading">
                        <Headings type="heading6" content="View All"/>
                    </div>
                    <div className="post-wrapper-top-left-view-icon">
                        <AiOutlineRight/>
                    </div>
                    
                        

                    </div>

                </div>
                <div className="post-wrapper-top-right">
                    <div className="post-wrapper-top-right-icon">
                    <BsThreeDotsVertical/>

                    </div>

                </div>

            </div>
            <div className="post-wrapper-bottom">
                <div className="post-wrapper-bottom-left">
                    <div className="post-wrapper-bottom-left-heading">
                        <Headings type="heading6" content="hello how was the project going?"/>

                    </div>
                    <div className="post-wrapper-bottom-left-Author">
                        <Paragraphs type="muted-text" content="By Cm Pandey"/>

                    </div>
                    <div className="post-wrapper-bottom-left-date">
                        <Paragraphs type="muted-text" content="joined on December 20"/>

                    </div>

                </div>
                <div className="post-wrapper-bottom-right">
                    <div className="post-wrapper-bottom-right-image">
                    <Images  Image={require("../../../assets/images/members.jpg")}
                    width={150} height={100} />
                    </div>

                </div>

            </div>
            

            <div className="post-wrapper-bottom">
                <div className="post-wrapper-bottom-left">
                    <div className="post-wrapper-bottom-left-heading">
                        <Headings type="heading6" content="hello how was the project going?"/>

                    </div>
                    <div className="post-wrapper-bottom-left-Author">
                        <Paragraphs type="muted-text" content="By Cm Pandey"/>

                    </div>
                    <div className="post-wrapper-bottom-left-date">
                        <Paragraphs type="muted-text" content="joined on December 20"/>

                    </div>

                </div>
                <div className="post-wrapper-bottom-right">
                    <div className="post-wrapper-bottom-right-image">
                    <Images  Image={require("../../../assets/images/members.jpg")}
                    width={150} height={100} />
                    </div>

                </div>

            </div>
            

        </div>
    )
}
