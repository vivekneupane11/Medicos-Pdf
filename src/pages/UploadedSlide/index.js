import React from 'react'
import { useLocation } from 'react-router';
import SEO from '../../components/global/SEO';
import { DisplayTitle } from '../../components/global/Titles';
import Loading from '../../components/loading';
import SlideCard from '../SlideDetail/components/slideCard';
import './_uploadedSlidePage.scss'

const UploadedSlide = () => {
    const location = useLocation();
    const {uploadData} = location.state;
    let  uploadedSlides = JSON.parse(uploadData);
 
    console.log('data in uploaded page:',uploadedSlides)
    return (
        <div className="slideUploaded-result-page-container">

            <SEO title='MedicosPDF uploadedSlide Page' description='All the search results are shown in this page that includes uploaded slides' />
            <div className="slideUploaded-result-page-book-section">
               
                <div className="slideUploaded-result-page-book-section-head">
                    <DisplayTitle title="Uploaded Slides" type="display3" />
                </div>
                {
                    uploadedSlides?.length ?

                        <div className="slideUploaded-result-page-book-section-grid">
                            {uploadedSlides.map((slide, index) => (
                                <div key={slide?.SlideName} className="item" >
                                    <SlideCard
                                        title={slide.slideCategory}
                                        description={slide.SlideName}
                                        images={slide.slideImages}
                                        datas={slide}
                                    />
                                   
                                </div>
                            ))}
                        </div>
                        :
                        <div>
                            {
                                uploadedSlides?
                                    <div className="slideUploaded-search-loading">
                                        <Loading />
                                    </div>
                                    :
                                    <h3 className='slideUploaded-dataNotFound-head'>(◕︵◕) Sorry,Data not found</h3>
                            }
                        </div>
                }
            </div>
            <div className="slideUploaded-result-page-slide-section">

            </div>
        </div>
    )
}

export default UploadedSlide
