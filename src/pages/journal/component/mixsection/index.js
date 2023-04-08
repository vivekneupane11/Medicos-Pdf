import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import TextClamp from 'react-string-clamp';
import NewsLinkTag from '../../../../components/global/newsLinkTag';
import { SocialFollow } from '../../../Article/Component/SocialFollow';
import AuthorDateRead from '../../../News/components/author-date-readTime';

import { LatestJournal } from '../latestJournal'
import './_mixsection.scss';
import { getColorByIndex, getReadTime } from '../../../../functions/tagColorAndReadTimeMethod';
import PagePagination from '../pagination/pagePagination';


export const MixSection = ({ mostVisited, journalData = {} }) => {

    const allData = journalData;

    const refToTop = useRef();
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState([]);
    const PER_PAGE = 25;
    const [active,setActive]=useState(false)


    const offset = currentPage * PER_PAGE;
    const currentPageData = data?.slice(offset, offset + PER_PAGE)
    const pageCount = Math.ceil(data?.length / PER_PAGE);
    


    useEffect(() => {
        let check = true
        const fetchData = () => {
            setData(allData)
        }
        fetchData();

        return () => {
            check = false
        }
    }, [allData])

    // const handlePageClick = ({ selected: selectedPage }) => {
    //     setCurrentPage(selectedPage);
    //     refToTop.current.scrollIntoView({ behavior: 'smooth' })
    // }
    const handlePageClick =  number => {
        setCurrentPage(number);
        setActive(true)
        refToTop.current.scrollIntoView({ behavior: 'smooth' })
    }
    const handelPrev=()=>{
        setCurrentPage(currentPage-1);
        refToTop.current.scrollIntoView({ behavior: 'smooth' })
    }

    const handelNext=()=>{
        setCurrentPage(currentPage+1);
        refToTop.current.scrollIntoView({ behavior: 'smooth' })
    }
    const recentJournalsData = allData?.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b?.isoDate) - new Date(a?.isoDate);
    });



    return (
        <div className="mixsection-wrapper">
            <div className="mixsection-wrapper-content">
                <div className="mixsection-wrapper-content-col1">
                    <h3 className="mixsection-wrapper-content-col1-heading">Most Visited</h3>
                    <div ref={refToTop} className="mixsection-wrapper-content-col1-item">
                        {
                            // allData?.map((data,index)=>{
                            currentPageData?.map((data, index) => {
                                let time_to_read = getReadTime(data.content) + ' min read'

                                return <div className="mixsection-wrapper-content-col1-item-content" key={index}>
                                    <NewsLinkTag color={getColorByIndex(index)} tag={data?.creator} />
                                    <Link
                                        className="mixsection-wrapper-content-col1-links"
                                        
                                        to={{
                                            pathname: '/journaldetails',
                                            state: {
                                                data: JSON.stringify(data),
                                            }
                                        }}>
                                        <h3 className="mixsection-wrapper-content-col1-item-content-heading">{data?.title}</h3>
                                        <TextClamp
                                            text={data.contentSnippet}
                                            lines={3}
                                            element='p'
                                            className="mixsection-wrapper-content-col1-item-content-para"
                                        />

                                    </Link>

                                    <AuthorDateRead date={new Date(data.isoDate).toDateString()} readTime={time_to_read} color='#9f9f9f' fontSize='12px' />
                                </div>

                            })
                        }
                    </div>

                    <div className="mixsection-wrapper-content-col1-pagination">
                        {/* <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            previousLinkClassName={"pagination__link-prev"}
                            nextLinkClassName={"pagination__link-next"}
                            disabledClassName={"pagination__link--disabled"}
                            activeClassName={"pagination__link--active"}
                        /> */}

                        <PagePagination pagecount={pageCount} pageClick={handlePageClick} prevClick={handelPrev} nextClick={handelNext}/>
                    </div>


                </div>

                <div className="mixsection-wrapper-content-col2">
                    <LatestJournal  journalsData={mostVisited} />
                    <SocialFollow />
                </div>

            </div>

        </div>
    )
}
