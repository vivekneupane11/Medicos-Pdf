import React from 'react'
import { newTab } from '../../../../functions/newTabMethod'
import './_newsIntroductionCard.scss'
const NewsIntroductionCard = () => {
    return (
        <>
            <div className="newsIntroductionCard-wrapper">
                
                <div className="newsIntroductionCard-wrapper-description">
                    <h6 className="newsIntroductionCard-wrapper-description-head">Hello, I'm Medicos PDF
                        <div className="newsIntroductionCard-wrapper-description-head-img" style={{ backgroundImage: `url(${require('../../../../assets/images/android-chrome-512x512.png').default})` }}>
                        </div>
                    </h6>
                    <p className="newsIntroductionCard-wrapper-description-para">I have 1000's of medical slides, books, journals, articles, news, medical notes. Please have me</p>
                    <button className="newsIntroductionCard-wrapper-description-btn"><p onClick={()=>newTab('https://play.google.com/store/apps/details?id=com.rjl.bookapp')} >Have Me</p></button>
                </div>


          </div>
        </>
    )
}

export default NewsIntroductionCard
