import firebase from "firebase";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../signUp/authMethods/authentication';
import './index.scss';


const NavbarSearch = () => {
  let inputRef = useRef();
  let history = useHistory();
  const { user } = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");
  const [bookDocId, setBookDocId] = useState([]);
  const [slideDocId, setSlideDocId] = useState([])
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      firebase.firestore().collection("K-Books")
        .get()
        .then((querySnapshot) => {
          let bookDocIdData = [];
          querySnapshot.forEach((doc) => {
            bookDocIdData.push(doc.id)
          })
          setBookDocId(bookDocIdData)
         

        })
      firebase.firestore().collection("AllSlidesDataLockDownVersions")
        .get()
        .then((querySnapshot) => {
          let slideDocIdData = [];
          querySnapshot.forEach((doc) => {
            slideDocIdData.push(doc.id);
            // console.log("Numbers of collection",doc.id)    
          })
          setSlideDocId(slideDocIdData)
         

        })
    }
    return () => {
      isMounted = false
    }
  }, [user?.uid])

  function search() {
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
    } else {
      toast.error("Please enter some text")
    }
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
        search();
      }
    }
    inputRef?.current?.addEventListener("keyup", enterHandler)
    return () => {
      inputRef?.current?.removeEventListener('keyup', enterHandler)
    }
  }, [searchText, bookDocId?.length, slideDocId?.length])

  return (
    <div className='topNavBarSearch'>
      <BsSearch className='topNavBarSearch-icon' />
      <input ref={inputRef} onChange={(e) => setSearchText(e.target.value)} value={searchText} placeholder="Search" type='search' />
    </div>
  )
}

export default NavbarSearch;