import React from 'react'
import NewsLinkTag from '../../../../components/global/newsLinkTag'
import AuthorDateRead from '../../../News/components/author-date-readTime'
import './_recent.scss'
import { Link } from 'react-router-dom'
import Loading from '../../../../components/loading'


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
                                        style={{ textDecoration: 'none' }}
                                        to={{
                                            pathname: `/slideDetails/${slideDetailsRight[7]?.SlideName}/${slideDetailsRight[7]?.slideCategory}/${slideDetailsRight[7]?.slideSubCategory.replace(/\s|\//g, "")}`,
                                          }}>
                       <h3 className="slideRecent-wrapper-left-mid-head">{slideDetailsRight[7]?.SlideName}</h3>
                     </Link>

                       <AuthorDateRead author={`Medicos Int'l`} authorColor='#fff' link='/ram' date='December 10,2019' readTime='5 Min read' color='#fff' fontSize='12px' />
                      
                   </div>

               </div>
               :
               <div style={{paddingTop:'200px',paddingBottom:'200px',width:'50%'}}>
                   <Loading/>
                </div>   
               
               }

                <div className="slideRecent-wrapper-right">
                    <h1 className="slideRecent-wrapper-right-head">Recent</h1>
                    {slideDetailsRight.length > 0 ?
                        <div className="slideRecent-wrapper-right-description">
                            {slideDetailsRight.filter((data, index) => index < 6).map((data, index) => (
                                <div key={index} className="slideRecent-wrapper-right-description-wrapper">
                                    <Link
                                        style={{ textDecoration: 'none' }}
                                        to={{
                                            pathname: `/slideDetails/${data?.SlideName}/${data?.slideCategory}/${data?.slideSubCategory.replace(/\s|\//g, "")}`,
                                            }}>
                                        <h3 className="slideRecent-wrapper-right-description-wrapper-head">{data.SlideName}</h3>
                                    </Link>
                                    <AuthorDateRead author={`Medicos Int'l`} authorColor='black' link='/ram' date={data?.slideCategory} readTime={data?.slideSubCategory} color='#9f9f9f' fontSize='12px' />
                                </div>
                            ))
                            }
                        </div>
                        :
                        <div className="recent-loading-wrapper">
                            <Loading />
                        </div>
                    }

                </div>

            </div>

        </>
    )
}

export default Recent
