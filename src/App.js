import React, { Suspense, useContext, useEffect, useState } from "react";
import LazyLoad from 'react-lazyload';
import Loadable from 'react-loadable';
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';



import LazyLoadingComponentLoader from "./components/lazyLoadingLoaderComponent";
import { AuthContext } from "./components/signUp/authMethods/authentication";
import useLocalStorage from "./customHooks/useLocalStorage";
// import { collection, doc, getFirestore, onSnapshot } from "firebase/firestore";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from './components/global/navbar';
import LoadingSearchAnimation from "./components/LoadingSearch";



const News = React.lazy(() => LazyLoadingComponentLoader(() => import("./pages/News").catch(e => window.location.reload())));
const Article = React.lazy(() => LazyLoadingComponentLoader(() => import("./pages/Article").catch(e => window.location.reload())));


const Component =  Loadable({
  loader: () => import('./pages/Component'),
  loading() {
    return <div className="loading">Loading...</div>
  }
});
const SignUpAndLogin =  Loadable({
  loader: () => import('./pages/signUpAndLoginPage').then(module => module.SignUpAndLogin),
  loading() {
    return <div className="loading">Loading...</div>
  }
});
const TermsAndConditions =  Loadable({
  loader: () => import('./pages/TermsAndServices').then(module => module.TermsAndConditions),
  loading() {
    return <div className="loading">Loading...</div>
  }
});
const DcmaPolicy =  Loadable({
  loader: () => import('./pages/TermsAndServices/dcmapolicy').then(module => module.DcmaPolicy),
  loading() {
    return <div className="loading">Loading...</div>
  }
});


const Footer =  Loadable({
  loader: () => import('./components/footer'),
  loading() {
    return <div className="loading">Loading...</div>
  }
});

const PreferenceModal =  Loadable({
  loader: () => import('./components/global/preferenceModal'),
  loading() {
    return <div className="loading">Loading...</div>
  }
});
const ToastTop =  Loadable({
  loader: () => import('./components/global/toastTop'),
  loading() {
    return <div className="loading">Loading...</div>
  }
});
const ErrorPage404 =  Loadable({
  loader: () => import('./pages/404 error'),
  loading() {
    return <div className="loading">Loading...</div>
  }
});
const AboutUs =  Loadable({
  loader: () => import('./pages/AboutUs'),
  loading() {
    return <div className="loading">Loading...</div>
  }
});

const NewsDetail =  Loadable({
  loader: () => import('./pages/NewsDetail'),
  loading() {
    return <div className="loading">Loading...</div>
  }
});
const Playlist =  Loadable({
  loader: () => import('./pages/Playlist'),
  loading() {
    return <div className="loading">Loading...</div>
  }
});
const PrivacyPolicy =  Loadable({
  loader: () => import('./pages/PrivacyPolicy'),
  loading() {
    return <div className="loading">Loading...</div>
  }
});
const ProfileDetails =  Loadable({
  loader: () => import('./pages/ProfileDetails'),
  loading() {
    return <div className="loading">Loading...</div>
  }
});


const UploadedSlide =  Loadable({
  loader: () => import('./pages/UploadedSlide'),
  loading() {
    return <div className="loading">Loading...</div>
  }
});
const UserDetail =  Loadable({
  loader: () => import('./pages/UserDetail'),
  loading() {
    return <div className="loading">Loading...</div>
  }
});
const ViewPlaylist =  Loadable({
  loader: () => import('./pages/ViewPlaylist'),
  loading() {
    return <div className="loading">Loading...</div>
  }
});







const Home = React.lazy(() => LazyLoadingComponentLoader(() => import("./pages/Home")));
const Book = React.lazy(() => LazyLoadingComponentLoader(() => import("./pages/Book")));
const BookDetail = React.lazy(() => LazyLoadingComponentLoader(() => import("./pages/BookDetail")));
const Slide = React.lazy(() => LazyLoadingComponentLoader(() => import("./pages/Slide")));
const SlideDetail = React.lazy(() => LazyLoadingComponentLoader(() => import("./pages/SlideDetail")));
const SlideSubCategoryPage = React.lazy(() => LazyLoadingComponentLoader(() => import("./pages/SlideSubCategories")));
const Journal = React.lazy(() => LazyLoadingComponentLoader(() => import("./pages/journal")));
const JournalDetails = React.lazy(() => LazyLoadingComponentLoader(() => import("./pages/JournalDetail")));
const ProfilePage = React.lazy(() => LazyLoadingComponentLoader(() => import("./pages/Profile/index.js")));
const UploadPageMain = React.lazy(() => LazyLoadingComponentLoader(() => import("./pages/uploadPageMain")));
const SearchResult = React.lazy(() => LazyLoadingComponentLoader(() => import("./pages/SearchResult")));




 

const App = ({id}) => {
  let history = useHistory();
  const [usernameLocalStorage, setUsernameLocalStorage] = useLocalStorage("username", null);
  const [preference, setPreference] = useLocalStorage("preference", null);
  const { logout, user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const [showModal, setShowModal] = useState(false)
  const [showToast, setShowToast] = useState(false);
  const [internetConnectivity, setInternetConnectivity] = useState(true);
  

  // const db = getFirestore();
  // const Auth = getAuth();
  const getFirebaseAll=()=>{
    return Promise.all([
      import('./firebase/firestore'),
      import('./firebase/auth')

    ])
    .then(([firestore,auth])=>{
      return{firestore,auth}
    })
  }

  function toggleShowToast() {
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 5000);
  }

  useEffect(async() => {
    try{
      const {auth:{auth,onAuthStateChanged}}=await getFirebaseAll()
      onAuthStateChanged(auth,(user)=>{
        setUser(user);
  
        if (initializing) setInitializing(false);
  
      })
    }
    catch(err){

    }
 
    
  }, [])

  useEffect(async() => {
    let isMounted = true;
    if ( navigator.onLine) {
      try {
        const {firestore:{db,doc,onSnapshot,collection}}=await getFirebaseAll();
        if (user?.uid) {
       
            const docRef=doc(db,'Web-Uid-To-Username',user?.uid)
            onSnapshot(docRef,(querySnapshot) => {
              if (!querySnapshot.exists() && isMounted) {
                history.push('/register')
              } else {
             
                  const colRef =collection(db,'Web-User-Data',querySnapshot?.data()?.username,'User-Preference')
                  onSnapshot(colRef,(res) => {
                    console.log('CHECKING USER ID', res.empty);
                    if (res.empty && isMounted) {
                      history.push('/register')
                    } else {
                      console.log('USER PREFERENCES', res?.docs[0]?.data()?.preference)
                      setPreference(res?.docs[0]?.data()?.preference)
                    }
                  })
                setUsernameLocalStorage(querySnapshot?.data()?.username)
              }
            })
        }
      } catch (error) {
        console.log("Error checking user preference", error);
      }
    }

    return () => {
    
      isMounted = false;
    }
  }, [user?.uid, usernameLocalStorage?.length, internetConnectivity])

  const location = useLocation();

  

  if (process.env.REACT_APP_STAGE === 'PROD')
    console.log = function no_console() { };
  return (
    <>
      <ToastContainer
        position="top-right"
      />
      <div className="main-container">
        {showModal &&
          <PreferenceModal toggleShowToast={toggleShowToast} />
        }
        {
          showToast && <ToastTop text='Preference successfully added' show={true} />

        }
        <Navbar />
      
 

          <Switch location={location} key={location.key} >
            <Route exact path="/">
              <Suspense fallback={<div className='suspenseLoading'><LoadingSearchAnimation/></div>}>
                <Home />
              </Suspense>
            </Route>

            <Route path="/book">
              <Suspense fallback={<div className='suspenseLoading'><LoadingSearchAnimation/></div>}>
                <Book />
              </Suspense>
            </Route>

            <Route path="/article">
            <Suspense fallback={<div className='suspenseLoading'><LoadingSearchAnimation/></div>}>

              <Article />
              </Suspense>
            </Route>


            <Route path="/bookdetails/:bookDocId">
              <Suspense fallback={<div className='suspenseLoading'><LoadingSearchAnimation/></div>}>
                <BookDetail />
              </Suspense>
            </Route>

            <Route path="/news">
            <Suspense fallback={<div className='suspenseLoading'><LoadingSearchAnimation/></div>}>

              <News />
              </Suspense>
            </Route>
            

            <Route exact path="/articledetails/:articleTitle/:articleSource">
              <NewsDetail />
            </Route>

            <Route path="/journal">
              <Suspense fallback={<div className='suspenseLoading'><LoadingSearchAnimation/></div>}>
                <Journal />
              </Suspense>
            </Route>

            <Route path="/journaldetails">
              <Suspense fallback={<div className='suspenseLoading'><LoadingSearchAnimation/></div>}>
                <JournalDetails />
              </Suspense>
            </Route>

            <Route path="/slide">
              <Suspense fallback={<div className='suspenseLoading'><LoadingSearchAnimation/></div>}>
                <Slide />
              </Suspense>
            </Route>

            <Route path="/slidesubcategory/:slideCategory/:slideSubCategory">
              <Suspense fallback={<div className='suspenseLoading'><LoadingSearchAnimation/></div>}>
                <SlideSubCategoryPage />
              </Suspense>
            </Route>

            <Route path="/slidedetails/:slideDocId/:slideCategory/:slideSubCategory">
              <Suspense fallback={<div className='suspenseLoading'><LoadingSearchAnimation/></div>}>
                <SlideDetail />
              </Suspense>
            </Route>

            <Route path="/component">
              <Component />
            </Route>


            <Route path="/profile/:userId">
              <Suspense fallback={<div className='suspenseLoading'><LoadingSearchAnimation/></div>}>
                <ProfilePage />
              </Suspense>
            </Route>

        
          

            <Route path="/uploadslide/(userId)?/:userId?/(slideDocId)?/:slideDocId?">
              <Suspense fallback={<div className='suspenseLoading'><LoadingSearchAnimation/></div>}>
                <UploadPageMain />
              </Suspense>
            </Route>

           

         
            <Route path="/termsandconditions">
              <TermsAndConditions />
            </Route>
            <Route path="/dcmapolicy">
              <DcmaPolicy />
            </Route>
            <Route path="/aboutus">
              <AboutUs />
            </Route>

            <Route exact path="/search/searchtext/:searchText">
              <Suspense fallback={<div className='suspenseLoading'><LoadingSearchAnimation/></div>}>
                <SearchResult />
              </Suspense>
            </Route>
            <Route path="/privacypolicy">
              <PrivacyPolicy />
            </Route>

            <Route path="/uploadedslides">
              <UploadedSlide />
            </Route>
            <Route  path="/playlist/:levelone?/:leveltwo?/:levelthree?">
             <Playlist/>
            </Route>

            <Route path="/viewplaylist/:username/:levelone?/:leveltwo?/:levelthree?">
             <ViewPlaylist/>
            </Route>

            <Route path="/register">
              <UserDetail />
            </Route>

            <Route path="/profiledetails">
              <ProfileDetails />
            </Route>

            <Route path="/404">
              <ErrorPage404 />
            </Route>
           

          


            <Route path="/signup"
            >
              <SignUpAndLogin />
            </Route>
          


            <Redirect to="/404" />

          </Switch>

        <LazyLoad height={200} offset={100}>
          <Footer />
        </LazyLoad>
      </div>
    </>
  )
}
export default App;
