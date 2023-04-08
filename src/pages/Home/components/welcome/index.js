import {
  faFacebook, faInstagram, faTwitter
} from '@fortawesome/free-brands-svg-icons';
import {
  faArrowRight, faDotCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from "firebase";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CgSoftwareUpload } from "react-icons/cg";
import { useHistory } from "react-router";
import { toast } from 'react-toastify';
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import "swiper/swiper.scss";

//local imports
import doctorimage from "../../../../assets/banner/img-04-1.png";
import {
  notesLists
} from "../../../../components/constants/mock";
import Loading from "../../../../components/loading";
import { AuthContext } from "../../../../components/signUp/authMethods/authentication";
import "./index.scss";





const Welcome = () => {
  let inputRef = useRef();
  let history = useHistory();
  const { user } = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");
  const [bookDocId, setBookDocId] = useState([]);
  const [slideDocId, setSlideDocId] = useState([])
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      firebase.firestore().collection("K-Books")
        .get()
        .then((querySnapshot) => {
          let bookDocIdData = [];
          querySnapshot.forEach((doc) => {
            bookDocIdData.push(doc.id)
          })
          setBookDocId(bookDocIdData)
        

        })
      firebase.firestore().collection("AllSlidesDataLockDownVersions")
        .get()
        .then((querySnapshot) => {
          let slideDocIdData = [];
          querySnapshot.forEach((doc) => {
            slideDocIdData.push(doc.id);
            // console.log("Numbers of collection",doc.id)    
          })
          setSlideDocId(slideDocIdData)
         

        })
    }
    return () => {
      isMounted = false
    }
  }, [user?.uid])

  function search() {
    if (searchText != "") {
      setLoading(true)
      if (bookDocId.length > 0 && slideDocId.length > 0) {
        setLoading(false);
        history.push({
          pathname: '/searchResult',
          state: {
            slideDocId: JSON.stringify(slideDocId),
            bookDocId: JSON.stringify(bookDocId),
            searchText: searchText
          }
        })
      }
    } else {
      toast.error("Please enter some text")
    }
  }

  useEffect(() => {
    if (loading) {
      if (bookDocId.length > 0 && slideDocId.length > 0) {
        setLoading(false);
        history.push({
          pathname: '/searchResult',
          state: {
            slideDocId: JSON.stringify(slideDocId),
            bookDocId: JSON.stringify(bookDocId),
            searchText: searchText
          }
        })
      }
    }
    function enterHandler(event) {
      if (event.key == "Enter") {
        search();
      }
    }
    inputRef?.current?.addEventListener("keyup", enterHandler)
    return () => {
      inputRef?.current?.removeEventListener('keyup', enterHandler)
    }
  }, [searchText, bookDocId?.length, slideDocId?.length])
  return (
    <div className="home-page-welcome-wrapper">
     
      <div className="home-page-welcome-wrapper-content">

        <section className="homebanner-left">
          <h1> Best Place for Authentic Medical Study Materials.<span> PERIOD </span></h1>
          <p>Knowledge is not for saving , it's for sharing. Get best Medical Materials Slides, Books, Notes , FlashNotes , News , Articles , Journals and many more. Be gentle enough to give back as well. From one to many - create once, share everywhere. </p>

          <section className="welcome-button-container btn-container">
            <a href='/uploadSlidePageMain' className="welcome-bottomLinks">
              <div>
                {/* <AiOutlineCloudUpload className="upload-icon" /> */}
                {/* <FontAwesomeIcon icon={faCloudUploadAlt} className="upload-icon" /> */}
                <CgSoftwareUpload  className="upload-icon"/>
                <span className='bannerButtonText'>upload slides</span>
              </div>
            </a>

            <a href='/slide' className="welcome-bottomLinks">
              <div>
                {/* <BiLogOut className="logOut-icon" /> */}

                <span className='bannerButtonText'>View All Slides</span>
              </div>
            </a>
          </section>
        </section>
        <section className="homebanner-left banner-animation-image">

          <div className="animating-container">
            <div className="animating-container-main">
              <img src={require('../../../../assets/images/home/animating banner/web.png').default} alt="banner" />
            </div>
            <div className="animating-container-one">
              <div className="animating-container-one-slide1">
                <img src={require('../../../../assets/images/home/animating banner/slides1.png').default} alt="banner" />
              </div>
              <div className="animating-container-one-slide2">
                <img src={require('../../../../assets/images/home/animating banner/slides2.png').default} alt="banner" />
              </div>

            </div>
            <div className="animating-container-two">
              <ul className="animating-container-two-ul">
                {notesLists.map((data, index) => {
                  return <li key={index}><FontAwesomeIcon icon={faDotCircle} className='dot' />{data.name}</li>
                })}
              </ul>

            </div>
            <div className="animating-container-three">

              <img src={require('../../../../assets/images/home/animating banner/medicos.png').default} alt="banner" />
              <h6 className="animating-container-three-para">Medicos Int'l</h6>
              <div className="animating-container-three-icons">
                <FontAwesomeIcon icon={faFacebook} className="FAicon" />
                <FontAwesomeIcon icon={faTwitter} className="FAicon" />
                <FontAwesomeIcon icon={faInstagram} className="FAicon" />
              </div>

            </div>
            <div className="animating-container-four">
              <img src={require('../../../../assets/images/home/animating banner/mobile.png').default} alt="banner" />
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
        src={require("../../../../assets/banner/headerBg.png").default}
      />

      {/* <div className="home-page-welcome-wrapper-downArrow">
        <FontAwesomeIcon
          icon={faLongArrowAltDown}
          className="home-page-welcome-wrapper-downArrow-icon"
        />
      </div> */}

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
              {
                    loading &&
                    <div className="home-search-loading-wrapper">
                        <Loading type="sync" size={10} />
                    </div>
                }
              {/*
                TODO
               <div className='dd-single'>   
                <DropdownSingle datas={dropdownsingle} />
              </div> */}
              <button onClick={() => search()} className="arrow-btn">
                <FontAwesomeIcon
                  className="icon-button"
                  style={{ color: "#12D288" }}
                  icon={faArrowRight}
                />
              </button>
            </section>
          </div>
        </aside>
        <aside className="search-right">
          <img src={doctorimage} alt="doctor" />
          <div className="search-join-info">
            <h4>Are you medicos?</h4>
            <h2> Join Our Team </h2>
            <button className="viewbook-btn button-banner-active" >
              <a className='joinAsMedicosBtn-link' href="/signUp">
                {" "}
                Join as Medicos{" "}
              </a>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Welcome;
