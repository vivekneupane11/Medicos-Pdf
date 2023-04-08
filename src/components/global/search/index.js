import React, { useRef, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import "./_search.scss";
import Loading from '../../loading';

const Search = ({ bookDocId, slideDocId }) => {
    let history = useHistory();
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();
    let search = ""
    function setSearch(value) {
        // console.log("This is value", value)
        search = value
        setSearchText(value)
    }

    useEffect(() => {

        if (loading) {
            if (bookDocId.length > 0 && slideDocId.length > 0) {
                setLoading(false);
                history.push({
                    pathname: '/searchResult',
                    state: {
                        slideDocId: JSON.stringify(slideDocId),
                        bookDocId: JSON.stringify(bookDocId),
                        searchText: searchText
                    }
                })
            }
        }

        function enterHandler(event) {
            if (event.key == "Enter") {
                if (searchText != "") {
                    setLoading(true)
                    if (bookDocId.length > 0 && slideDocId.length > 0) {
                        setLoading(false);
                        history.push({
                            pathname: '/searchResult',
                            state: {
                                slideDocId: JSON.stringify(slideDocId),
                                bookDocId: JSON.stringify(bookDocId),
                                searchText: searchText
                            }
                        })
                    }
                }
            }
        }
        inputRef?.current?.addEventListener("keyup", enterHandler)
        return () => {
            inputRef?.current?.removeEventListener('keyup', enterHandler)
        }
    }, [searchText, bookDocId, slideDocId])
    return (
        <div className="search-container">
            <div className="search-container-search-box">
                <BsSearch className="icon" />
                {/* <p>Search Medical Books</p> */}
                <input
                    ref={inputRef}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Medical Books"
                    className="hello"
                    type="search" />
                {
                    loading &&
                    <div className="search-loading-wrapper">
                        <Loading type="clip" size={35} />
                    </div>
                }
            </div>
        </div>
    )
}

export default Search
