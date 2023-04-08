
// import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { toast } from 'react-toastify';
import Loading from '../../components/loading';
import useDocId from "../../customHooks";
import Loadable from 'react-loadable';

import { logEventWithParams } from "../../functions/commonMethod";
import { AuthContext } from '../signUp/authMethods/authentication';
import './index.scss';
import SearchIcon from '../global/icons/search';

const Downshift =  Loadable({
  loader: () => import('downshift'),
  loading() {
    return <div className='loading'>Loading...</div>
  }
});

const NavbarSearch = () => {
  let inputRef = useRef();
  const ref = useRef()
  let history = useHistory();
  const { user , username:usernameauth } = useContext(AuthContext)
  const location = useLocation();
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const { slideDocId, bookDocId, profileDocId } = useDocId(inputText);
  const [allDocId, setAllDocId] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [fullSearch, setFullSearch] = useState(false);
  const [downshiftmatchinglist, setDownshiftMatchingList] = useState([0])
  const [userSearchHistoryText,setUserSearchHistoryText]=useState(null)




  function search(value = null) {
    if (inputText !== "") {
      logEventWithParams('search_entered', { searchText: value ? value : inputText })
      setFullSearch(false)
      setIsOpen(false)
      history.push({
        pathname: `/search/searchtext/${value ? value : inputText}`,
      })

    } else {
      toast.error("Please enter some text",{theme:'dark',hideProgressBar:true})
    }
  }

  //LISTENER TO CLOSE THE SEARCH HINTS CONTAINER ON CLICKING OUTSIDE THE CONTAINER
  useEffect(() => {

    let isMounted=true

    const checkIfClickedOutside = e => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setInputText('')
        setFullSearch(false)
        setIsOpen(false)
      }else if(ref.current && !ref.current.contains(e.target)){
        setFullSearch(false)
      }
    }

    if(isMounted){
      document.addEventListener("mousedown", checkIfClickedOutside)
    }
    return () => {

      document.removeEventListener("mousedown", checkIfClickedOutside)
      isMounted=false
    }
  }, [isOpen])

  //SET THE SEARCH PARAMETER FROM LINK TO THE INPUT FIELD
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setInputText(location.search.replace(/\?/g, ""));
    }
    return () => {
      isMounted = false;
    }
  }, [location.search])

  //COMBINES AND SETS ALL THE DOC ID FOR SEARCH'S HINTS
  useEffect(() => {
    let isMounted=true

    if(isMounted){
      setAllDocId([...slideDocId,...bookDocId,...profileDocId])
    }

    return ()=>{
      isMounted=false
    }
   
  }, [slideDocId, bookDocId,profileDocId])


  useEffect(() => {
    let isMounted=true

    if(isMounted){
      function getItems(filter) {
    
        if (filter!== '' && filter?.length < 3 ) {
    
          let filteredData=[]
          if(userSearchHistoryText){
           filteredData=[...filteredData,...userSearchHistoryText]
            filter=[...filter,...userSearchHistoryText]
          }
          return filteredData.length ? filteredData : [filter]
        }
         else if (filter && filter !== '' && filter?.length >= 3 ) {
    
          let filteredData = allDocId.filter(d => {
            return d.toLowerCase().replace(/\s/g, '').includes(filter.toLowerCase().replace(/\s/g, ''))
          }
          )
            if(userSearchHistoryText){
              filteredData=[...filteredData,...userSearchHistoryText]
              filter=[...filter,...userSearchHistoryText]
            }
    
          return filteredData.length ? filteredData : [filter]
        } else {
          setIsOpen(false);
          return []
        }
      }
      setDownshiftMatchingList(() => getItems(inputText))

    }


    return ()=>{
      isMounted=false
    }

  }, [allDocId,inputText,userSearchHistoryText])

  //DEBOUNCE USED TO EXECUTE CODE AFTER CERTAIN TIME 
  const openSearchHints = (value) => {
    setInputText(value)
    if (allDocId?.length > 0 && value !== '') {
      setLoading(false)
      setFullSearch(true)
      setIsOpen(true)
    }
  }



// const db=getFirestore();
const getFirebaseAll=()=>{
  return Promise.all([
    import('../../firebase/firestore')
  ])
  .then(([firestore])=>{
    return {firestore}
  })
}
//fetched logged user history a
  useEffect(async() => {
    let isMounted=true

    if(isMounted && user && usernameauth){
      try {
      const {firestore:{db,collection,onSnapshot}}=await getFirebaseAll()
        const colRef = collection(db,'Web-User-Data',usernameauth,'Search-History')
        onSnapshot(colRef,(res)=>{
          if(res){
            
            let allHistory = []
            res.forEach(ele => {
                allHistory.push(ele.data());
            })
         
            if(allHistory){
                 let allHistoryText=[]
                allHistory.forEach(element => {
                allHistoryText.push(element.searchedText)
              });
              if(allHistoryText){
             
                setUserSearchHistoryText(allHistoryText)
                
              }
             
            }
          }
        })
       
        
      } catch (error) {
        console.log('error fetching search history',error)
        
      }

    }

    return () => {
      isMounted=false
    }
  }, [usernameauth,user])



 


  return (
    <div className='topNavBarSearchContainer'>
      <div ref={ref} className={`topNavBarSearch ${fullSearch ? 'topNavBarFullSearch' : ''}`}>
        <SearchIcon className='topNavBarSearch-icon' />
       
        <Downshift
          onChange={selection =>
            console.log(selection)
          }
          onOuterClick={() => setFullSearch(false)}

          //ONINPUT VALUE IS USED SEPARATELY TO TRIGGER DEBOUNCE BECAUSE DEBOUNCE ONLY WORKS WITH CONST(NOTE: DON'T USE FUNCTION FOR DEBOUNCE)
          onInputValueChange={openSearchHints}
          itemToString={item => (item ? item : '')}
        >
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            highlightedIndex,
            
            getRootProps,
          }) => (
            <div className='navsearch'
            >
              <div
                className="search-input-wrapper"
                {...getRootProps({}, { suppressRefError: true })}
              >
                <input
                  ref={inputRef}
                  onFocus={() => setFullSearch(true)}
                  placeholder="Search medical books , slides ,articles , notes , journals ..."
                  type='search'
                  {...getInputProps({
                    onKeyDown: event => {
                      if (event.key === 'Enter') {
                        search()
                      }
                    },
                  })}
                  value={inputText}
                />
              </div>
              {
                loading || isOpen ?
                  <div
                    className='menu-container'>
                    {
                      loading ?
                        <div className='italic-text'>
                          <i>Searching....  {`'${inputText}'`}</i>
                          <Loading />
                        </div>
                        :
                        <ul className='listing' {...getMenuProps()}>                          
                          <li
                          
                            onClick={() => {
                              search(inputText)
                            }}
                          >
                            <SearchIcon className='topNavBarSearch-icon list-icon' /> <span>{inputText}
                            </span>
                          </li>

                          {isOpen
                            ? downshiftmatchinglist.map((item, index) => {
                              return (
                                <li
                                  {...getItemProps({
                                    key: item+index,
                                    index,
                                    item,
                                    style: {
                                      backgroundColor:
                                        highlightedIndex === index ? '#12D288' : 'white',
                                      paddingTop: 8,
                                      paddingBottom: 8,
                                      paddingLeft: 5,
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: 'center'
                                    },
                                  })}
                                
                                >
                                  <span onClick={() =>{search(item) }}>
                                    {item?.split("-", 1)[0]}
                                  </span>
                                
                                </li>

                              )
                            })
                            : null
                          }
                        </ul>
                    }
                  </div>
                  :
                  null
              }
            </div>
          )}
        </Downshift>
      </div>
    </div>
  )
}
export default NavbarSearch;