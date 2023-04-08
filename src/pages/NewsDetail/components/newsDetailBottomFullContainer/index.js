import React from 'react'
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser'

//local imports
import { newsDetailFollowUsDetails} from '../../../../components/constants/mock'
import Loading from '../../../../components/loading'
import FollowUs from '../followUs'
import InHypeSponsored from '../inHypeSponsored'
import NewsDetailAlsoRead from '../newsDetailAlsoRead'
import NewsDetailMoreFromInHype from '../newsDetailMoreFromInHype'
import NewsIntroductionCard from '../newsIntroductionCard'
import Trending from '../Trending'
import './_newsDetailBottomFullContainer.scss'





const NewsDetailBottomFullContainer = ({
    details1,
    details1Source,
    details2,
    details2Source,
    details3,
    details3Source,
    articlePara,
}) => {
 
    function transform(node,index){
        if(node.type==="tag"){
            switch(node.name){
                case 'st':
                    node.name = 'strong';
                    if(node.children?.length){
                        if(node?.children[0].data!==undefined){
                            return <strong key={index} style={{color:'#333333',fontSize:'22px',fontFamily:'Nunito',fontWeight:'800',textTransform:'capitalize'}}>{node.children[0].data}</strong>
                        }
                   
                    }
                    return  convertNodeToElement(node, index, transform);
  
                case 'sec':
                    node.name = 'section';
                    return  convertNodeToElement(node, index, transform);
  
                case 'p':
                    if(node.children?.length){
                        if(node.children[0].data!==undefined){
                            return <p key={index} style={{lineHeight:'1.75',margin:'10px 0'}}>{node.children[0].data}</p>
                        }
                    
                    }
                    return  convertNodeToElement(node, index, transform);
             
                case 'li':
                    node.name = 'ol';
                    if(node.children?.length){
                        if(node.children[0].data!==undefined){
                            return <p key={index} style={{margin:'10px 0'}}>{node.children[0].data}</p>
                        }
                    
                    }
                    return  convertNodeToElement(node, index, transform);    
            }
        }
   }
  
  const options = {
    decodeEntities:true,
    transform,
  }

    return (
        <>
          <div className="newsDetailBottomFullContainer-wrapper">
              <div className="newsDetailBottomFullContainer-wrapper-left">
                    <div className="newsDetailBottomFullContainer-wrapper-left-para1">
                       
                        {ReactHtmlParser(articlePara,options)}
                        </div>
                    <div className="newsDetailBottomFullContainer-wrapper-left-morefromHype">
                        <div className="newsDetailBottomFullContainer-wrapper-left-morefromHype-top">
                             <h3 className="newsDetailBottomFullContainer-wrapper-left-morefromHype-top-head1">More for you</h3>
                            
                             {
                                 details1.length>0?
                                 <NewsDetailMoreFromInHype details1Source={details1Source} details={details1} />
                                 :
                                 <div className='newsDetailMoreFromInhype_loading'>
                                     <Loading/>
                                </div>
                             }
                            
                        </div>
                       
                    </div>
                   
                   <div className="newsDetailBottomFullContainer-wrapper-left-alsoRead">
                       {
                           details1.length>0?
                                <NewsDetailAlsoRead details1Source={details1Source} details={details1} />
                                :
                                <div className='newsDetailMoreFromInhype_loading'>
                                    <Loading />
                                </div>
                       }
                      
                     
                   </div>
                   
                  
              </div>
              <div className="newsDetailBottomFullContainer-wrapper-right">
                    <NewsIntroductionCard />
                    {
                        details2.length>0?
                        <Trending details2Source={details2Source} details={details2} />
                        :
                        <div className='newsDetailMoreFromInhype_loading'>
                            <Loading />
                         </div>   
                    }
                   
                    <div className="newsDetailBottomFullContainer-wrapper-right-inhypeSponsored">
                        <h3 className="newsDetailBottomFullContainer-wrapper-right-inhypeSponsored-head">Read more</h3>
                        {
                            details3.length>0?
                            <InHypeSponsored details3Source={details3Source} details={details3} />
                            :
                            <div className='newsDetailMoreFromInhype_loading'>
                                <Loading/>
                            </div>
                        }
                      
                    </div>    
                    <FollowUs details={newsDetailFollowUsDetails} />
              </div>
          </div>
            
        </>
    )
}

export default NewsDetailBottomFullContainer
