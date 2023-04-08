import React from 'react'
import { Button } from '../global/button'
import './_awesomeProduct.scss';

export const AwesomeProducts= ({awesomeProduct}) => {
    const newTab=(url)=>{
        window.open(
           url, "_blank");
    }
    return (
        <div className="product-wrapper">
              <div className="product" > 
                  <div  className="product-card" >
                        <div className="product-card-iconImage">
                             <img src= {awesomeProduct.Icon} alt={awesomeProduct.productTitle} height='98%' width='98%' className="product-card-iconImage-img"/>
                        </div>

                        <div className="product-card-details">
                            <div className="card-heading" >
                               <h5>{awesomeProduct.productTitle}</h5>
                            </div>
                            <p>{awesomeProduct.productDetails}</p>
                        </div>

                        <div className="product-card-bottom">
                            <div className="product-card-bottom-content">
                                {awesomeProduct.bottomIcon}
                                <div  className="product-card-bottom-content-btn" onClick={()=>newTab(awesomeProduct.bottomButtonLink)}>
                                    <Button type={awesomeProduct.bottomButtontype} label={awesomeProduct.bottomLabel } />
                                </div>    
                                
                            </div>
                        
                        </div>

                  </div>
            
            </div>
        </div>
    )
}
