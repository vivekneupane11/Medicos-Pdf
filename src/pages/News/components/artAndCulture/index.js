import React from 'react'
import './_artAndCulture.scss'
import NewsLinkTag from '../../../../components/global/newsLinkTag'
import AuthorDateRead from '../author-date-readTime'
// import { logEventWithParams } from '../../../../functions/commonMethod'
import shortid from  "shortid";
import { getColorByIndex, getReadTime } from '../../../../functions/tagColorAndReadTimeMethod'
import { newTab } from '../../../../functions/newTabMethod'

const ArtAndCulture = ({details}) => {



    return (
        <>

          <div className="ArtAndCulture-wrapper">
              <h3 className="ArtAndCulture-wrapper-head1">Science</h3>
              <h6 className="ArtAndCulture-wrapper-head2">FROM ALL OVER THE WORLD</h6>
              <div className="ArtAndCulture-wrapper-description">
                  {details?.filter((data,index)=>index>=11 && index<13).map((data,index)=>(
                    <div  key={shortid.generate()} className="ArtAndCulture-wrapper-description-img" style={{backgroundImage:`url(${data?.image?.url[0]})`}}>
                        <div className="ArtAndCulture-wrapper-description-img-inner">
                        <NewsLinkTag color={getColorByIndex(index)} tag={data?.categories[0]} />
                            <h3 className="ArtAndCulture-wrapper-description-img-inner-heading" onClick={()=>newTab(data?.link,data?.title,'web_news_detail_page_opened')}>{data?.title}</h3>
                            <AuthorDateRead date={new Date(data?.isoDate).toDateString()} readTime={getReadTime(data?.content) + " min read"} color='#fff' fontSize='12px'/>
                        </div>
                    </div>
                  ))}
                 
              </div>
            
          </div>
            
        </>
    )
}
export default React.memo(ArtAndCulture)
