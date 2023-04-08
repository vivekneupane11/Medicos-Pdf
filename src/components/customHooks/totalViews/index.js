import React,{useState,useEffect} from 'react'
// import {getDatabase, off, onValue,ref} from 'firebase/database'
import Reference from 'yup/lib/Reference';

const useTotalViews = (pathname,docId) => {
    const [totalViewsCount,setTotalViewsCount]=useState(null);
    let documentName=docId?.replace(/[#.[$]/g,'').replace(/]/,'').replace(/\s/g,'')
    // const database = getDatabase();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../../../firebase/database')
        ])
        .then(([database])=>{
            return{database}
        })
    }
    
    useEffect(async() => {
       try{
        const {database:{database,ref,onValue,off}}=await getFirebaseAll()
        const refrence= ref(database,`viewCount/${pathname}/${documentName}` )
        let isMounted=true;
             const onValues=(res)=>{
                try{
                    if(res?.val()){
                            if(res?.val()?.viewCount){
                            let views=res?.val()?.viewCount;
                             setTotalViewsCount(views)
                            }
                    }
                    else{
                        setTotalViewsCount(0)
                    }
                   
                }catch(err){
                console.log("Error fetching count", err);
            }
        }
      
        if(isMounted && docId){
          

             onValue(refrence,onValues,{onlyOnce: true})


        }
         
        return () => {
           
            off(refrence,onValues)
            isMounted=false
           
        }
       }
       catch(err){

       }
    }, [docId,Reference])

    return totalViewsCount
}

export default useTotalViews
