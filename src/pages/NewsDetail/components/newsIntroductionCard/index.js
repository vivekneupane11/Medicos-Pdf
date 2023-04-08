import React from 'react'
import './_newsIntroductionCard.scss'
const NewsIntroductionCard = ({details}) => {
    return (
        <>
            <div className="newsIntroductionCard-wrapper">
                
                <div className="newsIntroductionCard-wrapper-description">
                    <h6 className="newsIntroductionCard-wrapper-description-head">Hello, I'm Medicos PDF
                        <div className="newsIntroductionCard-wrapper-description-head-img" style={{ backgroundImage: `url(${require('../../../../assets/images/appIcon/pdf.png').default})` }}>
                        </div>
                    </h6>
                    <p className="newsIntroductionCard-wrapper-description-para">I have 1000's of medical slides, books, journals, articles, news, medical notes. Please have me</p>
                    <button className="newsIntroductionCard-wrapper-description-btn"><a href='https://bookapp.page.link/Review'>Have Me</a></button>
                </div>


          </div>
        </>
    )
}

export default NewsIntroductionCard
