import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import TextClamp from 'react-string-clamp';
import { latestJournal } from '../../../../components/constants/mock'
import NewsLinkTag from '../../../../components/global/newsLinkTag';
import { SocialFollow } from '../../../Article/Component/SocialFollow';
import AuthorDateRead from '../../../News/components/author-date-readTime';

import { LatestJournal } from '../latestJournal'
import './_mixsection.scss';


export const MixSection = ({ mostVisited, journalData = {} }) => {
    const newTab = (url,title) => {
        window.open(
            url, "_blank");
        // logEventWithParams('web_journals_detail_page_opened', { journalTitle: title })
    }
    // console.log('MixSection data',journalData)
    const allData = journalData;

    const refToTop = useRef();
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState([]);
    const PER_PAGE = 25;


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

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
        refToTop.current.scrollIntoView({ behavior: 'smooth' })
    }



    const recentJournalsData = allData?.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b?.isoDate) - new Date(a?.isoDate);
    });
    //   const recentJournalsData = allData

    const getReadingTime = (text) => {
        const wordsPerMinute = 120;
        const textLength = text.split(" ").length;
        let minutesToRead = Math.ceil(textLength / wordsPerMinute);
        return minutesToRead;

    };

    const getColorsByIndex = (index) => {
        let color = "yellow";
        if (index % 3 == 0) {
            color = 'red'
        } else if (index % 2 == 0) {
            color = 'skyblue'
        }
        return color;
    }
    return (
        <div className="mixsection-wrapper">
            <div className="mixsection-wrapper-content">
                <div className="mixsection-wrapper-content-col1">
                    <h3 className="mixsection-wrapper-content-col1-heading">Most Visited</h3>
                    <div ref={refToTop} className="mixsection-wrapper-content-col1-item">
                        {
                            // allData?.map((data,index)=>{
                            currentPageData?.map((data, index) => {
                                let time_to_read = getReadingTime(data.content) + ' min read'

                                return <div className="mixsection-wrapper-content-col1-item-content" key={index}>
                                    <NewsLinkTag color={getColorsByIndex(index)} tag={data?.creator} />
                                    <Link
                                        className="journal-mixSection-col1-links"
                                        style={{ textDecoration: 'none' }}
                                        to={{
                                            pathname: '/journalDetails',
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
                        <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            previousLinkClassName={"pagination__link-prev"}
                            nextLinkClassName={"pagination__link-next"}
                            disabledClassName={"pagination__link--disabled"}
                            activeClassName={"pagination__link--active"}
                        />
                    </div>


                </div>

                <div className="mixsection-wrapper-content-col2">
                    <LatestJournal latestJournal={latestJournal} journalsData={mostVisited} />
                    <SocialFollow />
                </div>

            </div>

        </div>
    )
}
