import { faDivide } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";
import "firebase/auth";
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { CgLogOut, CgSoftwareUpload } from "react-icons/cg";
import { VscClose, VscMenu } from "react-icons/vsc";
import { useHistory, useLocation } from 'react-router';
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

//local imports
import { AuthContext } from '../../../components/signUp/authMethods/authentication';
import { navLinks, profile } from '../../constants/mock';
import NavbarProfile from '../../navbarProfile';
import NavbarSearch from '../../navbarSearch';
import { Button } from '../button';
import LatestNewsTop from '../latestNews';
import { LoginModal } from '../loginModel';
import './_navbar.scss';









const Navbar = () => {

    const [scroll, setScroll] = useState(false);
    const { logout, user, setUser } = useContext(AuthContext);
    const [showMenu, setShowMenu] = useState(false);
    const [activeLink, setActiveLink] = useState(null);
    const [showNestedActiveLink, setShowNestedActiveLink] = useState(false);
    const firestoreDatabase = firebase.firestore();
    const [latestNews, setLatestNews] = useState(null);
    const [showFormModel,setShowFormModel]=useState(false)
    const [uploadButtonClick,setUploadButtonClick]=useState(null)
    const history=useHistory()
    const location=useLocation()
 
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            try {
                firestoreDatabase.collection("Web-Latest-News")
                    .get()
                    .then((querySnapshot) => {
                        if (querySnapshot) {
                            let latestData = [];
                            querySnapshot.forEach((doc) => {
                                latestData.push(doc.data());
                            })
                            setLatestNews(latestData);

                        }
                    })
            } catch (error) {
                console.log("Error while fetching latest news");
            }
        }

        return () => {
            isMounted = false
        }
    }, [])

    const toggleActiveLink = (id) => {
        setShowNestedActiveLink(true);
        if (id == activeLink)
            setShowNestedActiveLink(!showNestedActiveLink);
        setActiveLink(id);
    }
    const changeBackground = () => {
        if (window.scrollY > 0) {
            setScroll(true);
        }
        else {
            setScroll(false);
        }
    }
    const onCLickLogout = () => {
        logout()
        setShowMenu(false)
    }
    useEffect(() => {
        window.addEventListener('scroll', changeBackground);

        return () => {
            window.removeEventListener('scroll', changeBackground);

        }
    }, [])

    useEffect(()=>{
         if(user?.uid && uploadButtonClick){
            setShowFormModel(false)
            history.push('uploadSlidePageMain')
            setUploadButtonClick(false)
         }

        else if(user?.uid){
            setShowFormModel(false)
        }


    },[user?.uid])

    const newTab = (url) => {
        window.open(
            url, "_blank");
    }


    const FormModel = useCallback(
        (dontShow) => {
       
            if (dontShow === false) {
                setShowFormModel(false)
              
            }


        },
        [showFormModel],
    )
  


    const handleNavChange=(index)=>{
        setActiveLink(index)
        
      

    }

    useEffect(() => {
       let isMounted=true;
       switch(location.pathname){
           case '/':
            setActiveLink(0);
            break
           case '/book':
            setActiveLink(1);
            break
           case '/article':
            setActiveLink(2);
            break
           case '/news':
            setActiveLink(3);
            break
           case '/journal':
            setActiveLink(4);
            break
           case '/slide':
            setActiveLink(5);
            break
         
       }


        return () => {
           isMounted=false;
        }
    }, [location.pathname])

    const goHomePage=()=>{
        if(user){
            history.push('/uploadSlidePageMain')
        }
        else{
            history.push('')
            setShowFormModel(true)
            setUploadButtonClick(true)
        }
       
    
    }

   
    return (
        <>
            {/* <ToastContainer
                position="top-right"
            /> */}

            <LatestNewsTop />
            <div className={`navbar-container ${scroll ? "navbar-container-scroll" : ""}`}>
               <LoginModal show={showFormModel} formModel={FormModel}/>
                <div className={'navbarAll'}>
                    <div className="logo">
                        <Link
                            className='logoAllTop-link'
                            style={{ textDecoration: 'none' }}
                            to={{
                                pathname: '/',


                            }}>
                            <img src={require("../../../assets/images/medicospdf_logo.png")?.default} alt='MedicosPdf Logo' className='logoBelowImage' style={{ width: 179, height: 38 }} />
                        </Link>
                    

                    </div>
                    <NavbarSearch />

                    <div className={'nav-item'}>
                        <ul className="nav-link">
                            {navLinks.map((navLink, index) => {
                                return <div key={index} className="link">
                                    <li>
                                        <Link to={navLink?.route} onClick={() => handleNavChange(index)}>{navLink?.name}</Link>
                                    </li>
                                    <div className={`indicator ${activeLink === index && "active"}`}></div>
                                </div>

                            })}
                            <li >
                                {!user &&
                                   
                                    <div onClick={() => setShowFormModel(true)}>
                                        <Button href="#" type="primary-outline-rounded" label="Join Now"/>

                                    </div>

                                }
                              
                                <div onClick={()=>goHomePage()}>
                                   <Button href="#" type="primary-outline-rounded" label="UPLOAD" icon={true} />
                                </div>    

                                {
                                    user?.uid &&
                                    <div>
                                        <NavbarProfile profileImage={user?.photoURL} datas={profile} />
                                    </div>
                                }
                            </li>

                        </ul>
                    </div>


                </div>
                <div className={'navbar-dropdown'}>
                    <div className="logo">
                        <a className='logo' href="/">
                        <img src={require("../../../assets/images/medicospdf_logo.png")?.default} alt='MedicosPdf logo' style={{ width: 130, height: 28 }}/>
                        </a>
                       
                    </div>
                    <div className='topNavBarSearch-mobileAndTablet'>
                        <BsSearch className='topNavBarSearch-mobileAndTablet-icon' />
                        <input type='search' />
                    </div>
                    <VscMenu className="icon" onClick={() => setShowMenu(!showMenu)} />


                    <div className={`nav-item${showMenu ? "-show" : ""}`}>
                        <div className="nav-item-top">
                            <div className="logo">
                                <img src={require("../../../assets/images/medicospdf_logo.png")?.default} alt='MedicosPdf logo' style={{ width: 173, height: 38 }} />
                                
                            </div>
                            <VscClose className="icon" onClick={() => setShowMenu(false)} />
                        </div>
                        <ul className="nav-link">
                            {navLinks.map((navLink, index) => {
                                return <div key={index} onClick={() => toggleActiveLink(navLink.id)} >
                                    <li >
                                        {navLink.icon}
                                        <Link to={navLink.route} onClick={() => setShowMenu(false)}>{navLink.name}</Link>
                                    </li>
                                   
                                </div>

                            })
                            }


                        </ul>
                        <faDivide href='/uploadSlidePageMain' className="bottomLinks-nav">
                            <div className='responsive-uploadSlides' onClick={() => setShowMenu(false)}>
                                <CgSoftwareUpload className="upload-icon" />
                                <p>upload slides</p>
                            </div>
                        </faDivide>

                        {
                            user ?
                                <div className="bottomLinks-nav">
                                        <a className='navDropdownProfileLinkContainer'  href={ '/profile/' + user?.uid}>
                                              <img src={user?.photoURL} className="navDropDown-profile-image" />
                                              <p className='navDropDown-ProfileLink'>Profile</p>
                                        </a>    

                                        <div className='responsive-logout' onClick={() => onCLickLogout()}>
                                           <CgLogOut className="logOut-icon" />
                                           <p>logout</p>
                                        </div> 
                                </div>
                                :
                                <div className="bottomLinks-nav" onClick={()=>{setShowFormModel(true);setShowMenu(false)}}>
                                    <div className='responsive-logout'>
                                        <p >Join Now</p>
                                    </div>
                                </div>
                        }
                    </div>


                </div>

            </div>
        </>
    )
}


export default Navbar