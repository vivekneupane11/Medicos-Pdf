import React, { useState,useCallback ,useContext,useEffect} from 'react'
import { AuthContext } from '../../../../components/signUp/authMethods/authentication'

// import "./_pagination.scss";
import Loadable from 'react-loadable';
import ArrowRight from '../../../../components/global/icons/arrow_right';
import ArrowLeft from '../../../../components/global/icons/arrow_left';
import DoubleArrowLeft from '../../../../components/global/icons/doubleArrow_left';
import DoubleArrowRight from '../../../../components/global/icons/doubleArrow_right';

const LoadableLoginModal =  Loadable({
    loader: () => import('../../../../components/global/loginModel').then(module => module.LoginModal),
    loading() {
      return <div className='loading'>Loading...</div>
    }
  });
const SlidePagination = ({ pages, activeColor,nextTrigger, previousTrigger, activeSlideTab, firstSlide, lastSlide }) => {
    // console.log(activeSlideTab, firstSlide, lastSlide, "activeSlideTap")

    const { user} = useContext(AuthContext);
    const [showFormModel, setShowFormModel] = useState(false)
    // const [activePage, setActivePage] = useState(0);
    const nextPage = () => {
        // if (activePage < pages.length - 1) {
        //     setActivePage(activePage + 1)

                nextTrigger( activeSlideTab)
              
           
           
        // }
    }
    const previousPage = () => {
        // if (activePage > 0) {
        //     setActivePage(activePage - 1)

            previousTrigger()
        
        // }
    }

    const FormModel = useCallback(
        (dontShow) => {

            if (dontShow === false) {
                setShowFormModel(false)

            }
        },
        [showFormModel],
    )

    useEffect(() => {
        let isMounted=true

        if(user){
            setShowFormModel(false)
        }
        return () => {
           isMounted=false
        }
    }, [user])

    const clickhandlerpreviouspage = () => previousPage()
    const clickhandlersetshowformmodel = () => setShowFormModel(true)
    const clickhandlernextpage5 = () => nextPage()
    const clickhandlerbuttoncircle = () => setShowFormModel(true)
    return (
        <div className="pagination-wrapper">
            <LoadableLoginModal show={showFormModel} formModel={FormModel} />
            <div className="pagination-wrapper-container">
                <div className="pagination-wrapper-container-button-circle">
                    <DoubleArrowLeft className="pagination-wrapper-container-button-icon"  />
                </div>
                {
                    user?
                    <div className="pagination-wrapper-container-button-circle" onClick={clickhandlerpreviouspage}>
                       <ArrowLeft className="pagination-wrapper-container-button-icon"  />
                   </div>
                   :
                   <div className="pagination-wrapper-container-button-circle" onClick={clickhandlersetshowformmodel}>
                      <ArrowLeft className="pagination-wrapper-container-button-icon"  />
                   </div>
                }

                {/*{*/}
                {/*    pages.map((page, index) => {*/}
                {/*        if (index == activePage) {*/}
                {/*            return <div key={index} className="pagination-wrapper-container-pages">*/}
                {/*                <div className={`pagination-wrapper-container-button-circle-active-${activeColor}`} onClick={() => setActivePage(index)}>*/}
                {/*                    <p className="pagination-wrapper-container-button-circle-active-p">{activePage + 1}</p>*/}
                {/*                </div>*/}
                {/*                {index + 1 <= (pages.length - 1) &&*/}
                {/*                    <div className="pagination-wrapper-container-button-circle" onClick={() => nextPage()}>*/}
                {/*                        <p className="pagination-wrapper-container-p">{activePage + 2}</p>*/}
                {/*                    </div>*/}
                {/*                }*/}
                {/*                {index + 2 <= (pages.length - 1) &&*/}
                {/*                    <div className="pagination-wrapper-container-button-circle" onClick={() => setActivePage(index + 2)}>*/}
                {/*                        <p className="pagination-wrapper-container-p">{activePage + 3}</p>*/}
                {/*                    </div>*/}
                {/*                }*/}

                {/*            </div>*/}
                {/*        }*/}
                {/*    })*/}
                {/*}*/}

               {
                   user?
                   <div className="pagination-wrapper-container-button-circle" onClick={clickhandlernextpage5}>
                      <ArrowRight className="pagination-wrapper-container-button-icon"  />
                  </div>
                  :
                  <div className="pagination-wrapper-container-button-circle" onClick={clickhandlerbuttoncircle}>
                     <ArrowRight className="pagination-wrapper-container-button-icon"  />
                  </div>
               }
                <div className="pagination-wrapper-container-button-circle">
                    <DoubleArrowRight className="pagination-wrapper-container-button-icon"  />
                </div>

            </div>
        </div>
    )
}
export default SlidePagination
