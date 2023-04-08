import React, { useState ,useEffect,useCallback, useContext} from 'react'
import './_leaveAReply.scss';
// import firebase from "firebase/compat/app";
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
import {  toast } from 'react-toastify';

// import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Loadable from 'react-loadable';
// import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { AuthContext } from '../../../../components/signUp/authMethods/authentication';


const LoadableLoginModal =  Loadable({
    loader: () => import('../../../../components/global/loginModel').then(module => module.LoginModal),
    loading() {
      return <div className='loading'>Loading...</div>
    }
  });


const LeaveAReply = ({ data, user ,editData}) => {
    const [input, setInput] = useState("");
    const [showFormModel,setShowFormModel]=useState(false)
    // const [mentionedName,setMentionedName]=useState(null)
    // const [mentionedMessage,setMentionedMessage]=useState(null)
    const [editState,setEditState]=useState(false)
    const [newEditData]=useState(editData?.reviewComment)
    const { username:usernameauth } = useContext(AuthContext)

    // const firestoreDatabase = firebase.firestore();

    //for autocomplete username
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    // const [suggestions,setSuggestions]=useState(['nepal','india','china'])
    const [suggestions]=useState([])
    // const db = getFirestore();
    const getFirebaseAll=()=>{
      return Promise.all([
        import('../../../../firebase/firestore')
      ])
      .then(([firestore])=>{
        return{firestore}
      })
    }
   

    useEffect(() => {
      let isMounted=true;
        if(isMounted &&  newEditData){
          setEditState(true)
          console.log('here',newEditData)
        }
     
        return () => {
         isMounted=false;
      }
    }, [newEditData])

    const onChange = (e) => {
      
        const userInput = e.target.value;
    
        // Filter our suggestions that don't contain the user's input
        const unLinked = suggestions.filter(
          (suggestion) =>
            suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
    
        setInput(e.target.value);
        setFilteredSuggestions(unLinked);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
      };

      const onClick = (e) => {
        setFilteredSuggestions([]);
        setInput(e);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
      };


      const SuggestionsListComponent = () => {
        return filteredSuggestions.length ? (
          <ul className="suggestions">
            {filteredSuggestions?.map((suggestion, index) => {
              let className;
              // Flag the active suggestion with a class
              if (index === activeSuggestionIndex) {
                className = "suggestion-active";
              }
              return (
                <li className={className} key={suggestion} onClick={()=>onClick(suggestion)}>
                  {suggestion}
                </li>
              );
            })}
          </ul> 
        ) : 
       
        ''
      };

      const onKeyDown = (e) => {
        // User pressed the enter key
        if (e.keyCode === 13) {
          setInput(filteredSuggestions[activeSuggestionIndex]);
          setActiveSuggestionIndex(0);
          setShowSuggestions(false);
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
          if (activeSuggestionIndex === 0) {
            return;
          }
    
          setActiveSuggestionIndex(activeSuggestionIndex - 1);
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
          if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
            return;
          }
    
          setActiveSuggestionIndex(activeSuggestionIndex + 1);
        }
      };


      //add comment 

    async  function addComment() {
        if (input !== "") {

            try {
              const {firestore:{db,addDoc,collection}}=await getFirebaseAll()
                addDoc(collection(db,'Web-Slide-Reviews',data?.SlideName,'Comments'),
                {
                  userUID: user?.uid,
                  user: user?.email,
                  displayName: user?.displayName,
                  photoURL: user?.photoURL,
                  SlideName: data?.SlideName,
                  slideCategory: data?.slideCategory,
                  slideSubCategory: data?.slideSubCategory,
                  reviewComment: input,
                  created_at: new Date(),
                  username:usernameauth,
                })
                .then((res) => {
                  setInput("");
                  toast.success("Comment added successfully",{theme:'dark',hideProgressBar:true})
                })
                // firebase.firestore().collection('Web-Slide-Reviews')
                //     .doc(data?.SlideName)
                //     .collection('Comments')
                //     .add({
                //         userUID: user?.uid,
                //         user: user?.email,
                //         displayName: user?.displayName,
                //         photoURL: user?.photoURL,
                //         SlideName: data?.SlideName,
                //         slideCategory: data?.slideCategory,
                //         slideSubCategory: data?.slideSubCategory,
                //         reviewComment: input,
                //         created_at: new Date(),
                //         username:usernameauth,
            
                //     })
            } catch (error) {
                toast.error("Error while adding comment",{theme:'dark',hideProgressBar:true})
              
            }
        }
        else {
            toast.error("Please enter some text",{theme:'dark',hideProgressBar:true})
        }
    }
    const FormModel = useCallback(
        (dontShow) => {
       
            if (dontShow === false) {
                setShowFormModel(false)
            
            }
        },
        [],
    )

    useEffect(()=>{
        if(user?.uid){
           setShowFormModel(false)
     
        }
   },[user?.uid])

  //  const submitEditData=()=>{
  //   if(editData && newEditData){
  //     try {
        
  //         // firestoreDatabase.collection('Web-Slide-Reviews')
  //         //     .doc(editData?.SlideName)
  //         //     .collection("Comments")
  //         //     .where('reviewComment','==',editData?.reviewComment)
  //         //     .where('created_at','==',editData?.created_at)
  //         //     .get()
  //             const colRef=query(collection(db,'Web-Slide-Reviews',editData?.SlideName,"Comments"),
  //             where('reviewComment','==',editData?.reviewComment),
  //             where('created_at','==',editData?.created_at))
  //             getDocs(colRef)
  //             .then((res)=>{
                
  //                 if(res){
  //                     // firestoreDatabase.collection('Web-Slide-Reviews')
  //                     // .doc(editData?.SlideName)
  //                     // .collection("Comments")
  //                     // .doc(res?.docs[0]?.id)
  //                     // .update({
  //                     //         reviewComment: newEditData,
  //                     //         created_at: new Date().toDateString
  //                     //     })
  //                     updateDoc(doc(db,'Web-Slide-Reviews',editData?.SlideName,"Comments",res?.docs[0]?.id),
  //                     {
  //                       reviewComment: newEditData,
  //                       created_at: new Date().toDateString
  //                     })
  //                     .then((res) => {
                             
  //                             toast.success("Review successfully edited",{theme:'dark',hideProgressBar:true})
  //                             setEditState(false)
  //                     })
  //                 }
  //             })
            
  //     } catch (error) {
  //         toast.error("Error while adding review")
      
  //     }
  //  }

  //  }
   
   const clickhandlerreply = () => addComment()
   const clickhandleleave = () => setShowFormModel(true)
    return (
        <>
        
             <div className="leaveAReply-container">
                <LoadableLoginModal show={showFormModel} formModel={FormModel}/>
                <h3 className="leaveAReply-container-head">Leave a Reply</h3>

                <div className="leaveAReply-container-form-message">
                    <textarea 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    name="message" as="textarea" 
                    onChange={onChange}
                    onKeyDown={onKeyDown}

                    />
                    {showSuggestions && input && <SuggestionsListComponent />}
                </div>
                {
                    user?
                  
                      <button type="submit" onClick={clickhandlerreply} className="leaveAReply-container-form-btn">Post comment</button>
                  
                    :
                    <button type="submit" onClick={clickhandleleave} className="leaveAReply-container-form-btn">Post comment</button>
                }

            </div>

           
           
        </>
    )
}
export default LeaveAReply
