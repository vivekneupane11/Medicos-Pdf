import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './_navigationLinks.scss'
const NavigationLinks = ({details}) => {
    return (
        <>

        <div className="newsDetailNavigationLinks-container">
           
           <div className="newsDetailNavigationLinks-container-left">
               <div className="newsDetailNavigationLinks-container-left-prev">
                   <FontAwesomeIcon icon={details.prevBtnIcon} className="newsDetailNavigationLinks-container-left-prev-icon"/>
                   <a href={details.prevLink} className="newsDetailNavigationLinks-container-left-prev-a"><p className="newsDetailNavigationLinks-container-left-prev-a-para">Previous</p></a>
               </div>
               <div className="newsDetailNavigationLinks-container-left-prevLink">
                   <h3 className="newsDetailNavigationLinks-container-left-prevLink-head"><a  href={details.nextLink} >{details.prevTitle}</a></h3>

               </div>

           </div>
           <div className="newsDetailNavigationLinks-container-right">
              
               <div className="newsDetailNavigationLinks-container-right-next">
                   <a href={details.nextLink} className="newsDetailNavigationLinks-container-right-next-a"><p className="newsDetailNavigationLinks-container-right-next-a-para">Next</p></a>
                   <FontAwesomeIcon icon={details.nextBtnIcon} className="newsDetailNavigationLinks-container-right-next-icon"/>
               </div>
               <div className="newsDetailNavigationLinks-container-right-nextLink">
                  <h3 className="newsDetailNavigationLinks-container-right-nextLink-head"><a  href={details.nextLink}>{details.nextTitle}</a></h3>
               </div>

           </div>
           
        </div>
            
        </>
    )
}

export default NavigationLinks
