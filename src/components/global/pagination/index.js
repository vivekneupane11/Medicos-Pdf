import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faTimes, faChevronLeft, faChevronRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
// import "./_pagination.scss";

const Pagination = ({ pages, activeColor,nextTrigger, previousTrigger }) => {
    // console.log(activeSlideTap,"Anatomy of Arm Anatomy of Arm activeSlideTap")

    const [activePage, setActivePage] = useState(0);
    const nextPage = () => {
        if (activePage < pages.length - 1) {
            setActivePage(activePage + 1)
            nextTrigger(activePage)
        }
    }
    const previousPage = () => {
        if (activePage > 0) {
            setActivePage(activePage - 1)
            previousTrigger(activePage)
        }
    }

    return (
        <div className="pagination-wrapper">
            <div className="pagination-wrapper-container">
                <div className="pagination-wrapper-container-button-circle">
                    <FontAwesomeIcon className="pagination-wrapper-container-button-icon" icon={faAngleDoubleLeft} />
                </div>
                <div className="pagination-wrapper-container-button-circle" onClick={() => previousPage()}>
                    <FontAwesomeIcon className="pagination-wrapper-container-button-icon" icon={faChevronLeft} />
                </div>

                {
                    pages.map((page, index) => {
                        if (index == activePage) {
                            return <div key={index} className="pagination-wrapper-container-pages">
                                <div className={`pagination-wrapper-container-button-circle-active-${activeColor}`} onClick={() => setActivePage(index)}>
                                    <p className="pagination-wrapper-container-button-circle-active-p">{activePage + 1}</p>
                                </div>
                                {index + 1 <= (pages.length - 1) &&
                                    <div className="pagination-wrapper-container-button-circle" onClick={() => nextPage()}>
                                        <p className="pagination-wrapper-container-p">{activePage + 2}</p>
                                    </div>
                                }
                                {index + 2 <= (pages.length - 1) &&
                                    <div className="pagination-wrapper-container-button-circle" onClick={() => setActivePage(index + 2)}>
                                        <p className="pagination-wrapper-container-p">{activePage + 3}</p>
                                    </div>
                                }

                            </div>
                        }
                    })
                }

                <div className="pagination-wrapper-container-button-circle" onClick={() => nextPage()}>
                    <FontAwesomeIcon className="pagination-wrapper-container-button-icon" icon={faChevronRight} />
                </div>
                <div className="pagination-wrapper-container-button-circle">
                    <FontAwesomeIcon className="pagination-wrapper-container-button-icon" icon={faAngleDoubleRight} />
                </div>

            </div>
        </div>
    )
}

export default Pagination
