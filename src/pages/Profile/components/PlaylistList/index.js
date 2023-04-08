import React,{useState,useEffect, useContext} from 'react';
// import firebase from 'firebase/compat'
// import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { AuthContext } from '../../../../components/signUp/authMethods/authentication';


const PlaylistList = ()=>{

    const [playlistList , setPlaylistList] = useState([])
    const { user,username } = useContext(AuthContext);

    // const db = getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../../../../firebase/firestore')
        ])
        .then(([firestore])=>{
            return {firestore}
        })
    };

    useEffect(async()=>{
        // firebase.firestore().collection('Web-User-Data')
        // .doc(username)
        // .collection('ListOfPlaylist')
        // .get()
      try{
          const {firestore:{db,collection,getDocs}}=await getFirebaseAll()
        const colRef=collection(db,'Web-User-Data',username,'ListOfPlaylist')
        getDocs(colRef)
        .then(querySnapshot => {
let playlistlistdata = []
           querySnapshot.forEach(doc=>{
             playlistlistdata.push(doc.data())
           })

           setPlaylistList(playlistlistdata)
        })
      }
      catch(err){
          console.log(err,'err')
      }

    },[username])

    return (
        <section className="playlist-list-container">
{
    playlistList.map(data=>{
        return ( 
            <>
            <p>{data.levelone}</p>
            <p>{data.slideCount}</p>

            <p>{data.leveltwo}</p>

            <p>{data.levelthree}</p>
            <p>{data.slideThumbnails}</p>
            {
                data.slideList.map(data=><p>{data}</p>)
            }


            </>
        )
    })
}
        </section>
    )
}


export default PlaylistList;