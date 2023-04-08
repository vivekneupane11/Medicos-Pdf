import React from 'react'
import './_fullbackgroundcard.scss'
 const FullBackgroundCard = ({type,src,text1,text2}) => {
    return (
        <div className={`bg-wrap-${type}`}>
            <div className="contain">
                <div className="fullbackgroundcard-wrapper" style={{backgroundImage:`url(${src})`}}>  
                   
                </div>
                <div className="fullbackgroundcard-wrapper-text">
                            <h5 className="fullbackgroundcard-wrapper-text-h5">{text1}</h5>
                            <h4 className="fullbackgroundcard-wrapper-text-h4">{text2}</h4>
                </div>
               
            </div>
        </div>
    )
}
export default FullBackgroundCard 
