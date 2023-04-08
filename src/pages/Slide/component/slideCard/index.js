import React from 'react'
import { Images } from '../../../../components/global/images'
import './_stackedSlideCard.scss';
import { IoAlbumsSharp, IoPlayCircleOutline } from "react-icons/io5";

export const StackedSlideCard = ({ slideImage1, slideImage2, slideImage3, slides }) => {
    return (
        <div className="slide">
            <div className="slide-image">
                <div className="slide-image1">
                    <Images Image={slideImage1} width={260} height={230} />
                </div>
                <div className="slide-image2">
                    <Images Image={slideImage2} width={260} height={230} />

                </div>
                <div className="slide-image3">
                    <Images Image={slideImage3} width={260} height={230} />
                </div>
                <div className="playbutton">
                    <IoPlayCircleOutline />
                </div>
                <div className="slide_tooltip">
                    <IoAlbumsSharp className="icon" />
                    <p>15 slides</p>
                </div>

            </div>
        </div>
    )
}
