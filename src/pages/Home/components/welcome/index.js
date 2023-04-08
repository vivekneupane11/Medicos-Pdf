

import React, { useContext, useEffect, useRef, useState, useCallback } from "react";
// import { CgSoftwareUpload } from "react-icons/cg";
import { useHistory } from "react-router";
import { toast } from 'react-toastify';
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import "swiper/swiper.scss";

//local imports
import doctorimage from "../../../../assets/banner/img-04-1.webp";
import {
  notesLists
} from "../../../../components/constants/mock";
import { AuthContext } from "../../../../components/signUp/authMethods/authentication";
// import { fetchAllBooksAndSlidesDocId } from '../../../../functions/firebaseMethod';
import "./index.scss";
import { logEventWithParams } from '../../../../functions/commonMethod';
// import { newTab } from '../../../../functions/newTabMethod';
import SocialAccounts from '../../../../components/socialAccounts';
import { Link } from 'react-router-dom';
import Loadable from 'react-loadable';
import ArrowRightLong from '../../../../components/global/icons/arrorRight_Long';
import UploadIcon from '../../../../components/global/icons/uploadIcon';
import FacebookIcon from '../../../../components/global/icons/SocialIcon/facebook';
import TwitterIcon from '../../../../components/global/icons/SocialIcon/twitter';
import InstagramIcon from '../../../../components/global/icons/SocialIcon/instagram';
import DotCircle from "../../../../components/global/icons/dotcircle";
import { LazyLoadImage } from "react-lazy-load-image-component";



const LoadableLoginModal =  Loadable({
    loader: () => import('../../../../components/global/loginModel').then(module => module.LoginModal),
    loading() {
      return <div style={{color:'gray'}}>Loading...</div>
    }
  });



const Welcome = () => {
  let inputRef = useRef();
  let history = useHistory();
  const { user } = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");
  const [showFormModel, setShowFormModel] = useState(false)
  const [showShare, setShowShare] = useState(false)



  function search() {
    if (searchText !== "") {
      history.push({
        pathname: `/search/searchtext/${searchText}`,
      })
    } else {
      toast.error("Please enter some text")
    }
  }

  useEffect(() => {
    function enterHandler(event) {
      if (event.key === "Enter") {
        logEventWithParams("search KeyWords", { SearchKeyword: searchText })
        search();
      }
    }
    inputRef?.current?.addEventListener("keyup", enterHandler)
    return () => {
      inputRef?.current?.removeEventListener('keyup', enterHandler)
    }
  }, [searchText])

  const FormModel = useCallback(
    (dontShow) => {

      if (dontShow === false) {
        setShowFormModel(false)

      }
    },
    [],
  )
  useEffect(() => {
    if (user?.uid) {
      setShowFormModel(false)

    }
  }, [user?.uid])

  const cancelShare = useCallback(
    (show) => {

      if (show === false) {
        setShowShare(false)

      }
    },
    [],
  )

  const clickhandlersearch2 = () => search()
  const clickhandlerviewbutton = () => setShowFormModel(true)
  const shareShowTrue=()=>setShowShare(true)
  return (
    <div className="home-page-welcome-wrapper">
      <LoadableLoginModal show={showFormModel} formModel={FormModel} />
      <SocialAccounts
              show={showShare}
              cancel={cancelShare}
              />
      <div className="home-page-welcome-wrapper-content">

        <section className="homebanner-left">
          <h1> Best Place for Authentic Medical Study Materials.<span> PERIOD </span></h1>
          <p>Knowledge is not for saving , it's for sharing. Get best Medical Materials <a className='link' href="https://medicospdf.com/slide">Slides</a>, <a className="link" href="https://medicospdf.com/book">Books</a>, Notes , FlashNotes , <a className="link" href="https://medicospdf.com/news">News</a> , <a className="link" href="https://medicospdf.com/article">Articles</a> , <a className="link" href="https://medicospdf.com/journal">Journals</a> and many more. Be gentle enough to give back as well. From one to many - create once, share everywhere. </p>

          <section className="welcome-button-container btn-container">
            <Link to='/uploadslide' className="welcome-bottomLinks">
              <div>
                <UploadIcon className="upload-icon" />
                <span className='bannerButtonText'>upload slides</span>
              </div>
            </Link>

            <Link to='/slide' className="welcome-bottomLinks">
              <div>
                {/* <BiLogOut className="logOut-icon" /> */}

                <span className='bannerButtonText'>View All Slides</span>
              </div>
            </Link>
          </section>
        </section>
        <section className="homebanner-left banner-animation-image">

          <div className="animating-container">
            <div className="animating-container-main">
            {/* <img  loading="lazy"   src={require('../../../../assets/images/home/animatingbanner/web.webp')} alt="banner" /> */}
            <LazyLoadImage  src={require('../../../../assets/images/home/animatingbanner/web.webp')} alt="banner" effect="blur"/>
            </div>
            <div className="animating-container-one">
              <div className="animating-container-one-slide1">
                {/* <img  loading="lazy" src={require('../../../../assets/images/home/animatingbanner/slides1.webp')} alt="banner" /> */}
                <LazyLoadImage src={require('../../../../assets/images/home/animatingbanner/slides1.webp')} alt="banner" effect="blur"/>
              </div>
              <div className="animating-container-one-slide2">
                {/* <img  loading="lazy" src={require('../../../../assets/images/home/animatingbanner/slides2.webp')} alt="banner" /> */}
                <LazyLoadImage src={require('../../../../assets/images/home/animatingbanner/slides2.webp')} alt="banner" effect="blur"/>
              </div>

            </div>
            <div className="animating-container-two">
              <ul className="animating-container-two-ul">
                {notesLists.map((data, index) => {

                 
                  return <li key={index}><DotCircle className='dot small-dot' />{data.name}</li>
                })}
              </ul>

            </div>
            <div className="animating-container-three">

              {/* <img  loading="lazy" src={require('../../../../assets/images/home/animatingbanner/medicos.webp')} alt="banner" /> */}
              <LazyLoadImage src={require('../../../../assets/images/home/animatingbanner/medicos.webp')} alt="banner" effect="blur"/>
              <h6 className="animating-container-three-para">Medicos Int'l</h6>
              <div className="animating-container-three-icons">
                <FacebookIcon className="FAicon" />
                <TwitterIcon className="FAicon" />
                <InstagramIcon className="FAicon" />
              </div>

            </div>
            <div className="animating-container-four">
              {/* <img  loading="lazy" src={require('../../../../assets/images/home/animatingbanner/mobile.webp')} alt="banner" /> */}
              <LazyLoadImage src={require('../../../../assets/images/home/animatingbanner/mobile.webp')} alt="banner" effect="blur"/>
            </div>
          </div>
        </section>
        {/* <div className="home-page-welcome-wrapper-content-head">
                  <h2>Welcome to Our Medicos Family</h2>
                </div>
               
                <div className="paragraph">
                    <p>Join our community of over one million medical students and doctors from all around the world, where you can share,connect, work and learn with our energetic team. </p>
                </div>     */}
        {/* <Search /> */}
      </div>

      <img
        className="background-image"
        src={require("../../../../assets/banner/headerBg.webp")}
        alt='bgImage'
      />
      {/* <LazyLoadImage className="background-image"
        src={require("../../../../assets/banner/headerBg.webp")}
        alt='bgImage'effect="blur"/> */}

    

      {/* // Search Container for Banner Starts Here */}

      <div className="search-container-banner">
        <aside className="search-left">
          <h3> Search from Medicos Library </h3>
          <div className="search-container">
            <section className="main-content">
              <input
                ref={inputRef}
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                type="search"
                placeholder="Search Medical Slides , Books , Dictionary , News , Articles Journals .."
                className='home-search-input'
              />
              {/*
                TODO
               <div className='dd-single'>   
                <DropdownSingle datas={dropdownsingle} />
              </div> */}
              <button onClick={clickhandlersearch2} className="arrow-btn">
                
                <ArrowRightLong
                  className="icon-button"
                 
                />
              </button>
            </section>
          </div>
        </aside>
        <aside className="search-right">
          <img  loading="lazy" src={doctorimage} alt="doctor" />
          {/* <LazyLoadImage src={doctorimage} alt="doctor" effect="blur"/> */}
          <div className="search-join-info">
            <h4>Are you medicos?</h4>
            <h2> Join Our Team </h2>
            {
              !user ?
                <button className="viewbook-btn button-banner-active" onClick={clickhandlerviewbutton}>
                  <div className='joinAsMedicosBtn-link' >
                    {" "}
                    Join as Medicos{" "}
                  </div>
                </button>
                :
                <button className="viewbook-btn button-banner-active">
                  <div className='joinAsMedicosBtn-link' onClick={shareShowTrue} >
                    {" "}
                    Join as Medicos{" "}
                  </div>
                </button>
            }
          </div>
        </aside>
      </div>
    </div>
  );
};
export default Welcome;
