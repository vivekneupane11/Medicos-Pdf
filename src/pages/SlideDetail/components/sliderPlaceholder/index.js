import React from 'react'
import { CSSTransition } from 'react-transition-group'
import './_slidePlaceholder.scss'

export const SliderPlaceholder = () => {
  return (
    <div className='sliderPlaceholder-wrapper'>
        <div className='sliderPlaceholder-wrapper-container'>
            <div className='sliderPlaceholder-wrapper-container-top'>
            <CSSTransition
                            classNames="sliderPlaceholder"
                            in={true}
                            appear={true}
                            timeout={3000}>
                <p className='heading'></p>
                </CSSTransition>

            </div>
            <div className='sliderPlaceholder-wrapper-container-center'>

                <div className='sliderPlaceholder-wrapper-container-center-left'>

                </div>
                <div className='sliderPlaceholder-wrapper-container-center-right'>
                    <div className='sliderPlaceholder-wrapper-container-center-right-image' >

                    </div>
                    <div className='sliderPlaceholder-wrapper-container-center-right-image' >

</div>
<div className='sliderPlaceholder-wrapper-container-center-right-image' >

</div>

                </div>

            </div>

            <div className='sliderPlaceholder-wrapper-container-bottom'>

            </div>

        </div>


    </div>
  )
}
