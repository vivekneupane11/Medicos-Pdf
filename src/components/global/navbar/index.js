import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link,NavLink } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../components/signUp/authMethods/authentication';
import { navLinks, profile } from '../../constants/mock';
import NavbarProfile from '../../navbarProfile';
import { Button } from '../button';
import './_navbar.scss';
import Loadable from 'react-loadable';
// import { collection, doc,  getFirestore, onSnapshot } from "firebase/firestore"; 
import menueBg from '../../../assets/images/art1.webp';
import UploadIcon from "../icons/uploadIcon";
import GridIcon from "../icons/gird_Icon";
import MenuIcon from "../icons/menuBar";
import LogoutIcon from "../icons/logout_icon";
import Users from "../icons/users";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { async } from '@firebase/util';


const NavbarSearch =  Loadable({
    loader: () => import('../../navbarSearch'),
    loading() {
      return <div className="loading">Loading...</div>
    }
  });

const LoadableLoginModal =  Loadable({
    loader: () => import('../loginModel').then(module => module.LoginModal),

    loading() {
      return <div>Loading...</div>
    }
  });

const Navbar = () => {
    const [scroll, setScroll] = useState(false);
    const { logout, user,username:usernameauth } = useContext(AuthContext);
    const [showMenu, setShowMenu] = useState(false);
    const [activeLink, setActiveLink] = useState(null);//<--
    const [showNestedActiveLink, setShowNestedActiveLink] = useState(false);//<--
    const [showFormModel, setShowFormModel] = useState(false)
    const [username, setUsername] = useState(null);

    const [uploadButtonClick, setUploadButtonClick] = useState(null)
    const history = useHistory()
    const [followerCount,setFollowerCount]=useState(null)
    const clickhandlersetshowform = () => setShowFormModel(true)
    const clickhandlersetshowmenu = () => setShowMenu(!showMenu)
    const clickhandlerlogout = () => onCLickLogout()
    const clickhandlersetformshowmodel = () => { setShowFormModel(true); setShowMenu(false) }
    const showmenuFalse=()=>setShowMenu(false)

    // const db = getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../../../firebase/firestore')
        ])
        .then(([firestore])=>{
            return{firestore}
        })
    }


    useEffect(async() => {
        if (navigator.onLine) {
            try {
                if (user?.uid) {
                   const {firestore:{db,doc,onSnapshot}}=await getFirebaseAll()

                    const docRef = doc(db,'Web-Uid-To-Username',user?.uid)
                        onSnapshot(docRef,(querySnapshot) => {
                            if (!querySnapshot.exists()) {

                                history.push('/register')
                            } else {
                                setUsername(querySnapshot?.data()?.username)
                            }
                        })
                }
              
            } catch (error) {
                console.log('Error fetching user preferences', error)
            }
        }
     
    }, [user?.uid,history])


    const toggleActiveLink = (id) => {
        setShowNestedActiveLink(true);
        if (id === activeLink)
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

    useEffect(() => {
        if (user?.uid && uploadButtonClick) {
            setShowFormModel(false)
            history.push('uploadslide')
            setUploadButtonClick(false)
        }

        else if (user?.uid) {
            setShowFormModel(false)
        }


    }, [user?.uid,history,uploadButtonClick])

    const FormModel = useCallback(
        (dontShow) => {

            if (dontShow === false) {
                setShowFormModel(false)

            }
        },
        [],
    )



   

    const goHomePage = () => {
        if (user) {
            history.push('/uploadslide')
        }
        else {
            history.push('')
            setShowFormModel(true)
            setUploadButtonClick(true)
        }
    }

   
    useEffect(async() => {
        let isMounted = true;
      try {
          const {firestore:{db,collection,onSnapshot}}=await getFirebaseAll()
        if (isMounted && usernameauth ) {
           
            const colRef = collection(db,'Web-User-Data',usernameauth,'Followers')
            onSnapshot(colRef,(res) => {
                if (res) {
           
                    let allFollowers=[]
                    res.forEach(element => {
                        allFollowers.push(element.data())
                        
                    })    
                     setFollowerCount(allFollowers.length)
                 
                }
            })
    }
          
      } catch (error) {
          
      }
        return () => {
            isMounted = false
        }
    }, [usernameauth])
   
    return (
        <>
      
            <div className={`navbar-container ${scroll ? "navbar-container-scroll" : ""}`}>
                <LoadableLoginModal show={showFormModel} formModel={FormModel} />
                <div className={'navbarAll'}>
                    <div className="logo">
                        <Link
                            className='logoAllTop-link'
                            
                            to={{
                                pathname: '/',


                            }}>
                            <img
                                src={require('../../../assets/images/medicospdf_logo.webp').default}
                                alt='MedicosPdf Logo'
                                className='logoBelowImage'
                                />
                        </Link>


                    </div>
                    <NavbarSearch />

                    <div className={'nav-item'}>
                        <ul className="nav-link">
                            {navLinks.map((navLink, index) => {


                                return <div key={index} className="link">
                                    <li className="item">
                                        <NavLink to={navLink?.route} exact={true} activeClassName="activeindicator">{navLink?.name}</NavLink>
                                    </li>
                                   
                                </div>

                            })}
                            <li >
                                {!user &&

                                    <div onClick={clickhandlersetshowform}>
                                        <Button href="#" type="primary-outline-rounded" label="Join Now" />

                                    </div>

                                }

                                <Link to="/uploadslide">
                                    <Button href="#" type="primary-outline-rounded" label="UPLOAD" icon={true} />
                                </Link>

                                {
                                    user?.uid &&
                                    <div>
                                        {(usernameauth || username) ?
                                            <NavbarProfile email={user?.email} profileImage={user?.photoURL} datas={profile} username={username ? username : usernameauth} />
                                            :
                                            <div className="profile-loading-placeholder"></div>}

                                    </div>
                                }
                            </li>

                        </ul>
                    </div>


                </div>
                <div className={'navbar-dropdown'}  >
                    <div className="logo" style={{ display: scroll ? 'none' : 'flex' }}>
                        <Link className='logo' to="/">
                            <LazyLoadImage  src={require('../../../assets/images/android-chrome-512x512.webp').default} alt={'MedicosPdf logo'} className='logo-images-navbar' effect='blur'/>
                            {/* <img src={require('../../../assets/images/android-chrome-512x512.webp').default} alt='MedicosPdf logo' style={{ width: 145, height: 35 }} /> */}
                        </Link>

                    </div>
                    <div className='topNavBarSearch-mobileAndTablet' style={{ width: scroll ? '100%' : '' }}>
                        <NavbarSearch />
                    </div>
                    <div onClick={clickhandlersetshowmenu}>

                    <MenuIcon className="menue-icon"  />
                    </div>

                 
                        <div className={showMenu?"drawer-wrapper-active":'drawer-wrapper'} onClick={clickhandlersetshowmenu}>
                        <div className={"navdrawer-active"}>
                  
                  <div className={`nav-item-show`}>
                 {
                     !user &&
                     <div onClick={showmenuFalse} className="nav-item-top">
                          <div className="logo">
                              <LazyLoadImage src={require('../../../assets/images/medicospdf_logo.webp').default} alt={'MedicosPdf logo'}  className='mobile-logo' effect='blur'/>
                              {/* <img src={require('../../../assets/images/medicospdf_logo.webp').default} alt='MedicosPdf logo'  className='mobilelogo' /> */}
                          </div>
                      </div>
                 }
                   {
                      user &&
                          <div onClick={showmenuFalse} className="bottomLinks-nav"  style={{ backgroundImage: `url(${menueBg})` }}>
                              <Link className='navDropdownProfileLinkContainer' to={'/profile/' + usernameauth}>
                                  {/* <img src={user?.photoURL} className="navDropDown-profile-image" alt="img"/> */}
                                  <LazyLoadImage src={user?.photoURL} className="navDropDown-profile-image" alt="img" effect='blur'/>
                                  <p className='navDropDown-ProfileLink'>{user?.displayName}</p>
                                  <p className="follower-counts">{followerCount} Followers <Users className="followersicons"/> </p>
                              </Link>
                          </div>
                      }
                  <ul className="nav-link">
                      {navLinks.map((navLink, index) => {
                          return <div key={index} onClick={() => toggleActiveLink(navLink.id)} >
                              <li className={`${activeLink===index? 'ActiveColorNavMobile':'inactive'}`} >
                                 {navLink.icon}
                                  <NavLink to={navLink.route} exact={true} onClick={() => setShowMenu(false)} ><p>{navLink.name}</p></NavLink>
                              </li>

                          </div>

                      })
                      }


                  </ul>

                  <div onClick={showmenuFalse} className="bottomLinks-nav">
                      <Link className='responsive-uploadSlides' to="register">
                          <GridIcon className="upload-icon" />
                          <p>Select Preference</p>
                      </Link>
                  </div>

                  <div onClick={showmenuFalse} className="bottomLinks-nav">
                      <Link className='responsive-uploadSlides' to="/uploadslide">
                          <UploadIcon className="upload-icon" />
                          <p>upload slides</p>
                      </Link>
                  </div>   

                      {
                          user?
                          <div className="login-logout">

                          <div className='responsive-logout' onClick={clickhandlerlogout}>
                              <LogoutIcon className="logOut-icon" />
                              <p>logout</p>
                          </div>
                          </div>
                         :
                          <div className="bottomLinks-nav" onClick={clickhandlersetformshowmodel}>
                              <div className="login-logout">

                              <div className='responsive-logout'>
                              <LogoutIcon className="logOut-icon" />
                                  <p >Login to MedicosPDF</p>
                              </div>
                              </div>
                          </div>
                  }
                 </div>
                 <div className='topNavigation-drawer-bottom'>
                     <Link to='/termsandconditions'>Terms And Conditions</Link>
                     <Link to='/privacypolicy'>Privacy Policy</Link>
                 </div>

             </div>
                        </div>

                </div>

            </div>
        </>
    )
}

export default React.memo(Navbar)