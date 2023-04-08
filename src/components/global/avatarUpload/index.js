import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./_avatarUpload.scss";

const AvatarUpload = () => {

    const [selectedImage, setSelectedImage] = useState(null)
    function readURL(event) {
        if (event.target.files[0]) {
            setSelectedImage(URL.createObjectURL(event.target.files[0]))
        }
          }

    return (
        <div className="avatar-upload-container">
            <div className="avatar-upload-container-wrapper">
                <div className="avatar-upload-container-wrapper-selected-avatar-container">
                    <img className="avatar-upload-container-wrapper-selected-avatar" alt="some img" src={selectedImage ? selectedImage : (require("../../../assets/images/uploadAvatar.png")?.default)} />
                </div>
                <div className="avatar-upload-container-wrapper-button-container">
                    <div className="avatar-upload-container-wrapper-button-container-select">
                        <input type="file" onChange={(e) => readURL(e)} />
                        {selectedImage ?
                            <p>CHANGE</p>
                            :
                            <p>SELECT IMAGE</p>
                        }
                    </div>
                    {selectedImage &&
                        <div className="avatar-upload-container-wrapper-button-container-remove" onClick={()=>setSelectedImage(null)}>
                            <FontAwesomeIcon icon={faTimes} className="icon" />
                            <p>REMOVE</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default AvatarUpload
