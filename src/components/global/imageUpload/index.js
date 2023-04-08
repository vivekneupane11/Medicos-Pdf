import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import image from "../../../assets/images/upload.png";
import "./_imageUpload.scss";

const ImageUpload = () => {

    const [selectedImage, setSelectedImage] = useState(null)
    function readURL(event) {
        if (event.target.files[0]) {
            setSelectedImage(URL.createObjectURL(event.target.files[0]))
        }
            }

    return (
        <div className="image-upload-container">
            <div className="image-upload-container-wrapper">
                <div className="image-upload-container-wrapper-selected-image-container">
                    <img className="image-upload-container-wrapper-selected-image" src={selectedImage ? selectedImage : (require("../../../assets/images/uploadPhoto.png")?.default)} />
                </div>
                <div className="image-upload-container-wrapper-button-container">
                    <div className="image-upload-container-wrapper-button-container-select">
                        <input type="file" onChange={(e) => readURL(e)} />
                        {selectedImage ?
                            <p>CHANGE</p>
                            :
                            <p>SELECT IMAGE</p>
                        }
                    </div>
                    {selectedImage &&
                        <div className="image-upload-container-wrapper-button-container-remove" onClick={()=>setSelectedImage(null)}>
                            <FontAwesomeIcon icon={faTimes} className="icon" />
                            <p>REMOVE</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ImageUpload
