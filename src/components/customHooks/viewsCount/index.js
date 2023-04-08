import React,{useState,useEffect} from 'react'

import { useLocation } from 'react-router';
// import {getDatabase, off, onValue, set, update,ref} from 'firebase/database'

const useViewsCount = (docId) => {
    const [viewCount,setViewCount]=useState(null);
    let location=useLocation()
    let documentName=docId?.replace(/[#.[$]/g,'').replace(/]/,'').replace(/\s/g,'')
    // const database = getDatabase()
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../../../firebase/database')
        ])
        .then(([database])=>{
            return{database}
        })
    }
    
    useEffect(async() => {
        let isMounted=true;
        
        try {
            const {database:{database,ref,onValue,set,update,off}}=await getFirebaseAll()
            const refrence =ref(database,`viewCount/${location?.pathname.split('/')[1]}/${documentName}`)
                const onValues=(res)=>{
                    try{
                        if(res?.val()){
                                if(res?.val()?.viewCount){
                                let views=res?.val()?.viewCount;
                                setViewCount(views+1)
                               
    
                               update(refrence,
                               {
                                viewCount:views+1,
                               })
                                }
                        }
                        else{
                          
                            set(refrence,
                            {
                             viewCount:1,
                            })
                            setViewCount(1)     
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
            } catch (error) {
                
            }
    }, [docId])

    return viewCount
}

export default useViewsCount
