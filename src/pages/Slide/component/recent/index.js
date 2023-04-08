import React from 'react'
import NewsLinkTag from '../../../../components/global/newsLinkTag'
import AuthorDateRead from '../../../News/components/author-date-readTime'
import './_recent.scss'
import { Link } from 'react-router-dom'
// import Loading from '../../../../components/loading'
import filterSlideSubCategory from '../../../../functions/filterSlideSubCategory';
import SlideRecentPlaceholder from '../recentPlaceholder'
import shortid from 'shortid'

const loadingArray=Array.apply(null,Array(10));


const Recent = ({  slideDetailsRight }) => {
    
    return (
        <>
            <div className="slideRecent-wrapper">
               {
                   slideDetailsRight.length>0?
                   <div className="slideRecent-wrapper-left" style={{ backgroundImage: `url(${slideDetailsRight[7].slideImages[0]})` }}>

                   <div className="slideRecent-wrapper-left-mid">
                       <NewsLinkTag color='red' tag={slideDetailsRight[7].slideSubCategory} />
                       <Link
                                        className='links'
                                        to={{
                                            pathname: `/slidedetails/${slideDetailsRight[7]?.SlideName}/${slideDetailsRight[7]?.slideCategory}/${filterSlideSubCategory(slideDetailsRight[7]?.slideSubCategory)}`,
                                          }}>
                       <h3 className="slideRecent-wrapper-left-mid-head">{slideDetailsRight[7]?.SlideName}</h3>
                     </Link>

                       <AuthorDateRead author={`Medicos Int'l`} authorColor='#fff' link='/ram' date='December 10,2019' readTime='5 Min read' color='#fff' fontSize='12px' />
                      
                   </div>

               </div>
               :
                                                loadingArray.map(()=>{
                                                        return <SlideRecentPlaceholder key={shortid.generate()}/>
                                                           
                                                    
                                                    })
               
               }

                <div className="slideRecent-wrapper-right">
                    <h1 className="slideRecent-wrapper-right-head">Recent</h1>
                    {slideDetailsRight.length > 0 ?
                        <div className="slideRecent-wrapper-right-description">
                            {slideDetailsRight.filter((data, index) => index < 6).map((data, index) => (
                                <div key={index} className="slideRecent-wrapper-right-description-wrapper">
                                    <Link
                                        className='links'
                                        to={{
                                            pathname: `/slidedetails/${data?.SlideName}/${data?.slideCategory}/${filterSlideSubCategory(data?.slideSubCategory)}`,
                                            }}>
                                        <h3 className="slideRecent-wrapper-right-description-wrapper-head">{data.SlideName}</h3>
                                    </Link>
                                    <AuthorDateRead author={`Medicos Int'l`} authorColor='black' link='/ram' date={data?.slideCategory} readTime={data?.slideSubCategory} color='#9f9f9f' fontSize='12px' />
                                </div>
                            ))
                            }
                        </div>
                        
                        :
                                                loadingArray.map(()=>{
                                                        return <SlideRecentPlaceholder/>
                                                           
                                                    
                                                    })
                    }

                </div>

            </div>

        </>
    )
}

export default Recent
