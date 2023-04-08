import React,{useState,useEffect} from 'react'
import './_latestNews.scss'
import firebase from "firebase";
import { ImCancelCircle } from 'react-icons/im';
const LatestNewsTop = () => {

    const firestoreDatabase = firebase.firestore();
    const [latestNews, setLatestNews] = useState(null);
    const [display,setDisplay]=useState(true);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            try {
                firestoreDatabase.collection("Web-Latest-News")
                    .get()
                    .then((querySnapshot) => {
                        if (querySnapshot) {
                            let latestData = [];
                            querySnapshot.forEach((doc) => {
                                latestData.push(doc.data());
                            })
                            setLatestNews(latestData);
                           
                        }
                    })
            } catch (error) {
                console.log("Error while fetching latest news");
            }
        }
        return () => {
            isMounted = false
        }
    }, [])
    return (
        <>
        {
             (latestNews &&  latestNews[0].visibility)?
             <div className={`${display? 'latestNews_container' :'visibilityNone'}`}>
             {
                 latestNews.filter((data,index)=>index===0).map((data,index)=>{
                     return<div key={index} className='latestNews_container_desc'>
                                 <p dangerouslySetInnerHTML={{__html: data.news} } className='latestNews_container_desc_info'></p>
                                 <ImCancelCircle  className='latestNews_container_desc_icon' onClick={()=>setDisplay(!display)}/>
                             </div>
                     
                 })
            
             }
             
         </div>
         :
         ''

        }
        
           
        </>
    )
}

export default LatestNewsTop
