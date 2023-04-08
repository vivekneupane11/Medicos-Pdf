import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './_aboutAuthor.scss'
const AboutAuthor = ({details}) => {
    return (
        <>

         <div className="newsDetailAboutAuthor-Container">
             <div className="newsDetailAboutAuthor-Container-left">
                 <a href={details.authorImgLink} className="newsDetailAboutAuthor-Container-left-a"> 
                     <div className="newsDetailAboutAuthor-Container-left-a-img" style={{ backgroundImage: `url(${details.authorImg})` }}>
                     </div>
                 </a>
                
                 <div className="newsDetailAboutAuthor-Container-left-posts">
                   {details.AuthorPostsNo}
                 </div>

             </div>
             <div className="newsDetailAboutAuthor-Container-right">
                 <h3 className="newsDetailAboutAuthor-Container-right-name"><a href={details.authorNameLink}>{details.authorName}</a></h3>
                 <h6 className="newsDetailAboutAuthor-Container-right-head">About Author</h6>
                 <p className="newsDetailAboutAuthor-Container-right-intro">{details.authorIntro}</p>
                 <div className="newsDetailAboutAuthor-Container-right-bottom">
                    <button className="newsDetailAboutAuthor-Container-right-bottom-btn"><a href={details.authorArticlesLink}>articles</a></button>

                    <div className="newsDetailAboutAuthor-Container-right-bottom-icons">
                        {details.socialLinks.map(data=>(
                            <a  key={data.id} className="newsDetailAboutAuthor-Container-right-bottom-icons-a">
                              <FontAwesomeIcon icon={data.icon} className="newsDetailAboutAuthor-Container-right-bottom-icons-a-icon"/>
                            </a>
                         
                       ))}
                    </div>
                 </div>
                

             </div>
         </div>
            
        </>
    )
}

export default AboutAuthor
