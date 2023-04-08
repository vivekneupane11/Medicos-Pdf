import React,{useContext, useState} from 'react';

import { toast } from 'react-toastify';
import './index.scss';
import { useHistory } from 'react-router-dom';
// import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { AuthContext } from '../../signUp/authMethods/authentication';
import CloseCircle from '../icons/xMark_Circle';
import CaretRight from '../icons/caretRight';

const PlayListFormModal = ({visibilityToogle,visibility,levelone , leveltwo , levelthree})=>{
    const [folderName , setFolderName] =  useState('')
    const [loading , setLoading] = useState(false)
    let history = useHistory();
    const { username } = useContext(AuthContext);

    const setFolderNameHandler = (e)=>{ setFolderName(e.target.value) }
    // const db = getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../../../firebase/firestore')
        ])
        .then(([firestore])=>{
            return{firestore}
        })
    }
    const createFolderPlaylist = async()=>{
        if(loading) return;
        setLoading(true)
   try {
      const {firestore:{db,doc,getDoc,setDoc}}=await getFirebaseAll() 
     const docRef = doc(db,'Web-User-Data', username,'Playlist',folderName)
     getDoc(docRef)
      .then((snapshot)=>{
          if(snapshot.exists()){
             setLoading(false)
         toast.error('Playlist already exist.',{ theme: 'dark', hideProgressBar: true })
          }else{
           if(!levelone && !leveltwo && !levelthree){
           
             setDoc(doc(db,'Web-User-Data', username,'Playlist',folderName),
             {
                 playlistName:'playlistNameTest'
             })
             .then(()=>{
                 history.push(`/playlist/${folderName}`)
                 setLoading(false)
                 toast.success("Playlist added successfully", { theme: 'dark', hideProgressBar: true });
                 visibilityToogle()
            
             })
         }
             else if(levelone && !leveltwo && !levelthree){
                   
                     setDoc(doc(db,'Web-User-Data',username,'Playlist',levelone,folderName,'playlist'),
                     {
                         playlistName:'playlistNameTest'
                     })
                     .then(()=>{
                         setLoading(false)
                         toast.success("Playlist added successfully", { theme: 'dark', hideProgressBar: true });
                         visibilityToogle()
                       history.push(`/playlist/${levelone}/${folderName}`)
                     })
             
           }
           else if(levelone && leveltwo && !levelthree){
            
           
             setDoc(doc(db,'Web-User-Data',username,'Playlist',levelone,leveltwo,folderName),
                     {
                         playlistName:'playlistNameTest'
                     })
             .then(()=>{
                 setLoading(false)
                 toast.success("Playlist added successfully", { theme: 'dark', hideProgressBar: true });
                 visibilityToogle()
               history.push(`/playlist/${levelone}/${leveltwo}/${folderName}`)
             })
     
   }
          
         }
      })
       
   } catch (error) {
       
   }
    }
    return <div className={`playlist-form-modal-container ${visibility?'playlist-form-modal-container-active':''}`}>
        <div onClick={visibilityToogle}>

        <CloseCircle  className="playlist-form-modal-close-icon"/>
        </div>
     
        <h5>Enter your folder name</h5>
        <span>You can organize the uploaded slides in different folder.</span>
    <section className="playlist-folder-name"> {  levelone && <aside> <span>{levelone }    </span> <CaretRight className="arrow-right-icon" size={20} /></aside> } {  leveltwo && <aside><span>{leveltwo }</span> <CaretRight className="arrow-right-icon" size={20} /></aside> } {  levelthree && <span>{levelthree } </span>} </section>
        <input type="text" placeholder='Folder Name' onChange={setFolderNameHandler} />
        <button onClick={createFolderPlaylist} >  {loading &&  <div class="loader"></div>}  <span>Create</span></button>
    </div>
}


export default PlayListFormModal;