import React, { useRef, useEffect, useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import "./_search.scss";
import { logEventWithParams } from '../../../functions/commonMethod';
import { AuthContext } from '../../signUp/authMethods/authentication';
import SearchIcon from '../icons/search';

const Search = () => {
    let history = useHistory();
    const [searchText, setSearchText] = useState("");
    const { user } = useContext(AuthContext);
    const inputRef = useRef();

    useEffect(() => {
        function enterHandler(event) {
            if (event.key === "Enter") {
                if (searchText !== "") {
                    logEventWithParams("search KeyWords", { SearchKeyword: searchText })
                    history.push({
                        pathname: `/search/searchtext/${searchText}`
                    })
                }
                console.log('search reneder')
            }
        }
        inputRef?.current?.addEventListener("keyup", enterHandler)
        return () => {
            inputRef?.current?.removeEventListener('keyup', enterHandler)
        }
    }, [searchText, user?.uid])
    return (
        <div className="search-container">
            <div className="search-container-search-box">
                <SearchIcon className="icon" />
                <input
                    ref={inputRef}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search medical books , slides , articles , news , journals , flashnotes ..."
                    className="hello"
                    type="search" />
            </div>
        </div>
    )
}

export default Search
