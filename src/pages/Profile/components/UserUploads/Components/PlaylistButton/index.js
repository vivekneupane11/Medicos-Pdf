import React, { useState } from 'react';
import PlayListFormModal from '../../../../../../components/global/PlaylistFormModal';
import './index.scss';
import PlusCircle from '../../../../../../components/global/icons/plus_circle';
const PlaylistCreate = ()=>{
    const [visible , setVisible] = useState(false)
    const visibilityToogle = ()=>setVisible(init=>!init)
    return  <>  <div onClick={visibilityToogle} className='playlist-create-button-container'>
        <PlusCircle size={38} className="playlist-create-icon"/> 
        <p className='playlist-para'>Create your playlist</p>   

    </div>
        <PlayListFormModal visibilityToogle={visibilityToogle} visibility={visible} />
    </>
}


export default PlaylistCreate;