import React, { useEffect, useState } from 'react';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/swiper.scss';
import ShareModal from '../../../../components/global/shareModal';
// import Loading from '../../../../components/loading';
import ButtonWithArrow from '../../../Home/components/buttonWithArrow';
import { SlideCardPlaceholder } from '../../../Slide/component/slideCardPlaceholder';
import SlideCard from '../../../SlideDetail/components/slideCard';
import './_slideTrendingProfile.scss';

const SlideTrendingProfile = ({ details, loading, showTitle = true, from }) => {

  const [userUploads, setUserUploads] = useState(false)
  const [likedSlidesAndBooks, setLikedSlidesAndBooks] = useState(false);
  const [showShare, setShowShare] = useState(false)
  const [callBackData, setCallBackData] = useState(null)

  useEffect(() => {
    switch (from) {
      case 'userUploads':
        setUserUploads(true)
        break;

      case 'likeSlidesAndBooks':
        setLikedSlidesAndBooks(true)
        break;

      default:
        break;
    }

    return () => {

    }
  }, [from])

  const showShareModal = (show, data) => {

      if (show === true && data) {
        setShowShare(true)
        setCallBackData(data)

      }
    }
  const cancelShare = (show) => {

      if (show === false) {
        setShowShare(false)

      }
    }
  return (
    <>
      <div className='slideTrendingProfile-container'>
        <div className="slideTrendingProfile-NotUploaded-slide-section">
          <ShareModal
            url={encodeURI(`https://medicospdf.com/slidedetails/${callBackData?.SlideName}/${callBackData?.slideCategory}/${callBackData?.slideSubCategory.replace(/\s|\//g, "")}`)}
            appId={process.env.REACT_APP_ID}
            title={callBackData?.SlideName}
            image={callBackData?.slideImages[0]}
            show={showShare}
            cancel={cancelShare}
          />
          {
            !loading ?
              <div>
                {
                  details?.length > 0 ?
                    <div className='slideTrendingProfile-container-wrapper'>
                      {details.map((data, index) => (
                        <div key={index} className='slideTrendingProfile-container-wrapper-slideCard'>
                          <SlideCard
                            title={data.slideCategory}
                            title2={data.slideSubCategory}
                            description={data.SlideName}
                            images={data.slideImages}
                            wholeDatas={details}
                            datas={data}
                            showShareModal={showShareModal}
                          />
                        </div>

                      ))}
                    </div>
                    :
                    //  <div className="slide-trendingProfile-loading-wrapper">
                    //     <Loading />
                    //  </div>
                    <div className="slideTrendingProfile-NotUploaded-slide-section">
                      {
                        userUploads &&
                        <h3 className="slideTrendingProfile-NotUploaded-slide-section-text">No uploaded slides.</h3>
                      }
                      {
                        likedSlidesAndBooks &&
                        <h3 className="slideTrendingProfile-NotUploaded-slide-section-text">No liked slides.</h3>
                      }
                      {
                        userUploads && <ButtonWithArrow name="Upload your first slide" link='/uploadslide' />
                      }
                      {
                        likedSlidesAndBooks && <ButtonWithArrow name="Explore Slides" link='/slide' />
                      }
                    </div>
                }
              </div>
              :
              <div className='loading-container'>
                <SlideCardPlaceholder/>
              </div>
          }
        </div>


      </div>
    </>
  )
}

export default SlideTrendingProfile
