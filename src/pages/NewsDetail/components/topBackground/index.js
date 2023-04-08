import React from 'react'
// import { AiFillEye } from 'react-icons/ai'
import { useParams } from 'react-router'
import {
    FacebookShareButton, LinkedinShareButton,
    PinterestShareButton, TwitterShareButton
} from "react-share"
import NewsLinkTag from '../../../../components/global/newsLinkTag'
import { getColorByIndex, getReadTime } from '../../../../functions/tagColorAndReadTimeMethod'
import AuthorDateRead from '../../../News/components/author-date-readTime'
import './_topBackground.scss'
import Eye from '../../../../components/global/icons/eye'
import FacebookIcon from '../../../../components/global/icons/SocialIcon/facebook'
import TwitterIcon from '../../../../components/global/icons/SocialIcon/twitter'
import LinkedinIcon from '../../../../components/global/icons/SocialIcon/linkedin'
import PiIntrestIcon from '../../../../components/global/icons/SocialIcon/piIntrest'


const TopBackground = ({details,viewCount}) => {

    const {articleTitle,articleSource}=useParams()

    let url=encodeURI(`https://medicospdf.com/articldetails/${articleTitle.replace(/\s|\//g, "%")}/${articleSource}`)

    return (
        <>
           <div className="newsDetailsTopBackground-wrapper">
              
               <div className="newsDetailsTopBackground-wrapper-leftBgImg" style={{backgroundImage:`url(${details?.image?.source_url})`}}>    
                    {/* <div className="newsDetailsTopBackground-wrapper-leftBgImg-rating">
                        4
                    </div> */}
               </div>

               <div className="newsDetailsTopBackground-wrapper-right">
                   <div className="newsDetailsTopBackground-wrapper-right-tags">
                      
                        <div  className="newsDetailsTopBackground-wrapper-right-tags-tag">   
                           <NewsLinkTag color={getColorByIndex(1)} tag={details?.slug} />
                        </div>
                      
                   </div>
                   <h3 className="newsDetailsTopBackground-wrapper-right-head">{details?.title?.rendered}</h3>
                   <div className='articleDetail-authorDateRead-container'>
                     <AuthorDateRead date={new Date(details?.date).toDateString()} readTime={getReadTime(details?.content?.rendered) + " min read"} color='#9f9f9f' fontSize='12px'/>
                      <div className='articleDetail-authorDateRead-container-views'>
                        <Eye className='articleDetail-authorDateRead-container-views-icon'/>
                        <h6 className='articleDetail-authorDateRead-container-views-count'>{viewCount}</h6>
                      </div>    
                   </div>
                  

                   <div className="newsDetailsTopBackground-wrapper-right-bottom">
                       {/*
                        TODO LIKE
                        <div className="newsDetailsTopBackground-wrapper-right-bottom-col1">
                           {newsDetailsTopBackground.likesAndLove.map(data=>(
                               <div  key={data.id} className="newsDetailsTopBackground-wrapper-right-bottom-col1-item">
                                    <div className="newsDetailsTopBackground-wrapper-right-bottom-col1-item-no">{data.likesAndloveNo}</div>
                               </div>
                           ))}
                          
                       </div> */}

                       <div className="newsDetailsTopBackground-wrapper-right-bottom-col2">
                          
                       <div  className="newsDetailsTopBackground-wrapper-right-bottom-col2">
                        <FacebookShareButton
                                url={url}
                                quote={details?.title?.rendered}
                            
                                style={{backgroundColor:'#3c5997'}}
                                className="newsDetailsTopBackground-wrapper-right-bottom-col2-item"
                                >
                                    <FacebookIcon className="newsDetailsTopBackground-wrapper-right-bottom-col2-item-a-icon"/>
                           
                            </FacebookShareButton>

                       </div>
                         

                        <div>
                        <TwitterShareButton
                            url={url}
                            title={details?.title?.rendered}
                            style={{backgroundColor:'#00aced'}}
                            className="newsDetailsTopBackground-wrapper-right-bottom-col2-item"
                           
                        >
                             <TwitterIcon className="newsDetailsTopBackground-wrapper-right-bottom-col2-item-a-icon"/>
                          
                        </TwitterShareButton>
                        </div>

                      <div>
                      <LinkedinShareButton
                          url={url}
                            title={details?.title?.rendered}
                        style={{backgroundColor:'#1178b3'}}
                        className="newsDetailsTopBackground-wrapper-right-bottom-col2-item"
                        >
                             <LinkedinIcon className="newsDetailsTopBackground-wrapper-right-bottom-col2-item-a-icon"/>
                           
                        </LinkedinShareButton>
                      </div>

                       <div>
                       <PinterestShareButton
                            url={url}
                            media={details?.image?.source_url}
                            style={{backgroundColor:'#cb2027'}}
                             className="newsDetailsTopBackground-wrapper-right-bottom-col2-item"
                        >
                             <PiIntrestIcon className="newsDetailsTopBackground-wrapper-right-bottom-col2-item-a-icon"/>
                           
                        </PinterestShareButton>
                       </div>


                     
                       </div>
                   </div>

               </div>
           </div>
            
        </>
    )
}

export default TopBackground
