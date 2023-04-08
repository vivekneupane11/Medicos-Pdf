import React from "react";
import { useHistory } from "react-router";

import "./_404error.scss";
import { Link } from "react-router-dom";
import SEO from "../../components/global/SEO";
import { LazyLoadImage } from "react-lazy-load-image-component";
const ErrorPage404 = () => {

    const history=useHistory()
    const goBack=()=>{
        history.goBack()
        
    }
const goHome=()=>goBack()

  

  return (
      <div className='errorPage-container'>
          <SEO title='Page Not Fount' description='Error 404' />
          <div className="lottiee-container" >
              <LazyLoadImage  className="loading"  src={'https://firebasestorage.googleapis.com/v0/b/vast-fuze-89905.appspot.com/o/PDFasssets%2Ferror.gif?alt=media&token=68a54156-3fb3-45a9-995a-bb5d5d56755a'} alt="error-crash"  effect="blur"/>
         {/* <img className="loading"  src={'https://firebasestorage.googleapis.com/v0/b/vast-fuze-89905.appspot.com/o/PDFasssets%2Ferror.gif?alt=media&token=68a54156-3fb3-45a9-995a-bb5d5d56755a'} alt="error-crash" /> */}
          </div>
        
          <Link to='/' className='errorPage-container-link'>Go to Home Page</Link>
          <div className='errorPage-container-goBack' onClick={goHome}>Go Back</div>
      </div>
  );
};

export default ErrorPage404;
