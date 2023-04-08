import firebase from "firebase";
import "firebase/auth";
import { AnimatePresence } from "framer-motion";
import React, { Suspense, useContext, useEffect, useState } from "react";
import {
  Route, Switch, useLocation
} from "react-router-dom";
import { footerDetails } from "./components/constants/mock";
import Feedback from "./components/feedback";
//LOCAL IMPORTS
import Footer from "./components/footer";
import Navbar from "./components/global/navbar";
import PreferenceModal from "./components/global/preferenceModal";
import ToastTop from "./components/global/toastTop";
import LazyLoadingComponentLoader from "./components/lazyLoadingLoaderComponent";
import Loading from "./components/loading";
import { AuthContext } from "./components/signUp/authMethods/authentication";
import AboutUs from "./pages/AboutUs";
import Component from "./pages/Component";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { TermsAndConditions } from "./pages/TermsAndServices";
import UploadedSlide from "./pages/UploadedSlide";
import News from './pages/News';
import Article from './pages/Article'
import NewsDetail from './pages/NewsDetail'

// const Home=React.lazy(()=>import('./pages/Home'))
const Home=React.lazy(()=>LazyLoadingComponentLoader(()=>import("./pages/Home")));
const Book=React.lazy(()=>LazyLoadingComponentLoader(()=>import("./pages/Book")));
const BookDetail=React.lazy(()=>LazyLoadingComponentLoader(()=>import("./pages/BookDetail")));
const Slide=React.lazy(()=>LazyLoadingComponentLoader(()=>import("./pages/Slide")));
// const News=React.lazy(()=>LazyLoadingComponentLoader(()=>import("./pages/News")));

const SlideDetail=React.lazy(()=>LazyLoadingComponentLoader(()=>import("./pages/SlideDetail")));
const SlideSubCategoryPage=React.lazy(()=>LazyLoadingComponentLoader(()=>import("./pages/SlideSubCategories")));
// const Article=React.lazy(()=>LazyLoadingComponentLoader(()=>import("./pages/Article")));
// const NewsDetail=React.lazy(()=>LazyLoadingComponentLoader(()=>import("./pages/NewsDetail")));
const Journal=React.lazy(()=>LazyLoadingComponentLoader(()=>import("./pages/journal")));
const JournalDetails=React.lazy(()=>LazyLoadingComponentLoader(()=>import("./pages/JournalDetail")));
const ProfilePage=React.lazy(()=>LazyLoadingComponentLoader(()=>import("./pages/Profile")));
const UploadPageMain=React.lazy(()=>LazyLoadingComponentLoader(()=>import("./pages/uploadPageMain")));
const SearchResult=React.lazy(()=>LazyLoadingComponentLoader(()=>import("./pages/SearchResult")));


const App = () => {
  const { logout, user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const [showModal, setShowModal] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const onAuthStateChanged = (user) => {
    setUser(user);
    
    if (initializing) setInitializing(false);
  };

  function toggleShowToast() {
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 5000);
  }

  useEffect(() => {
    // firebase.auth().currentUser.getIdToken().then((res)=>console.log("This is ID Token",typeof(res)));
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [])

  useEffect(() => {
    let isMounted = true;
    try {
      if (user?.uid) {
        firebase.firestore().collection('Web-User-Data')
          .doc(user?.uid)
          .collection('User-Preference')
          .onSnapshot((querySnapshot) => {
            if (querySnapshot.empty && isMounted) {
              setShowModal(true)
            };
          })
      }
    } catch (error) {
      console.log("Error checking user preference", error);
    }
    return () => {
      isMounted = false
    }
  }, [user?.uid])

  const location = useLocation();
  return (
    <>
      <div className="main-container">
        {showModal &&
          <PreferenceModal toggleShowToast={toggleShowToast} />
        }
        {
          showToast && <ToastTop text='Preference successfully added' show={true}/>

        }
        <Navbar/>
        <Feedback />
        <AnimatePresence
          initial={false}
          exitBeforeEnter>

          <Switch location={location} key={location.key}>
            <Route exact path="/">
              <Suspense fallback={<div style={{ padding: '200px 0' }}><Loading /></div>}>
                <Home />
              </Suspense>
            </Route>

            <Route path="/book">
              <Suspense fallback={<div style={{ padding: '200px 0' }}><Loading /></div>}>
                <Book />
              </Suspense>
            </Route>
            {/* <Route path="/article">
              <Suspense fallback={<div style={{ padding: '200px 0' }}><Loading /></div>}>
                <Article />
              </Suspense>
            </Route> */}
              <Route path="/article">
                <Article />
            </Route>


            <Route path="/bookDetails/:bookDocId">
              <Suspense fallback={<div style={{ padding: '200px 0' }}><Loading /></div>}>
                <BookDetail />
                </Suspense>
              </Route>



              {/* <Route path="/news">
              <Suspense fallback={<div style={{padding:'200px 0'}}><Loading/></div>}>
                <News />
              </Suspense>
            </Route> */}
             <Route path="/news">
                <News />
            </Route>

             {/* <Route exact path="/articleDetails/:articleTitle/:articleSource">
              <Suspense fallback={<div style={{ padding: '200px 0' }}><Loading /></div>}>
                <NewsDetail />
              </Suspense>
            </Route> */}
             <Route exact path="/articleDetails/:articleTitle/:articleSource">
                <NewsDetail />
            </Route>

            <Route path="/journal">
              <Suspense fallback={<div style={{ padding: '200px 0' }}><Loading /></div>}>
                <Journal />
              </Suspense>
            </Route>

            <Route path="/journalDetails">
              <Suspense fallback={<div style={{ padding: '200px 0' }}><Loading /></div>}>
                <JournalDetails />
              </Suspense>
            </Route>

            <Route path="/slide">
              <Suspense fallback={<div style={{ padding: '200px 0' }}><Loading /></div>}>
                <Slide />
              </Suspense>
            </Route>

            <Route path="/slideSubCategory">
              <Suspense fallback={<div style={{ padding: '200px 0' }}><Loading /></div>}>
                <SlideSubCategoryPage />
              </Suspense>
            </Route>

            <Route path="/slideDetails/:slideDocId/:slideCategory/:slideSubCategory">
              <Suspense fallback={<div style={{ padding: '200px 0' }}><Loading /></div>}>
                <SlideDetail />
              </Suspense>
            </Route>

            <Route path="/component">
              <Component />
            </Route>
            <Route path="/profile/:userId">
              <Suspense fallback={<div style={{ padding: '200px 0' }}><Loading /></div>}>
                <ProfilePage />
              </Suspense>
            </Route>

            <Route path="/uploadSlidePageMain">
              <Suspense fallback={<div style={{ padding: '200px 0' }}><Loading /></div>}>
                <UploadPageMain />
              </Suspense>
            </Route>

            <Route path="/termsAndConditions">
              <TermsAndConditions />
            </Route>

            <Route path="/aboutUs">
              <AboutUs />
            </Route>

            <Route path="/searchResult">
              <Suspense fallback={<div style={{ padding: '200px 0' }}><Loading /></div>}>
                <SearchResult />
              </Suspense>
            </Route>
            <Route path="/privacyPolicy">
              <PrivacyPolicy />
            </Route>

            <Route path="/uploadedSlides">
               <UploadedSlide />
            </Route>


          </Switch>

        </AnimatePresence>
        <Footer details={footerDetails} />
      </div>
    </>
  )
}

export default App;
