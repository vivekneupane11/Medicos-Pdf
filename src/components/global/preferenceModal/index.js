import firebase from "firebase";
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsArrowRight } from "react-icons/bs";

//local imports
import { preferencesCategories } from '../../../constants/Preference/PreferencesCategories';
import { AuthContext } from '../../signUp/authMethods/authentication';
import './index.scss';


let faculties = [];
const CategoryOption = ({ name, faculty, image, fadedImage, selected, selectedFaculty }) => {
    const [imageSize, setImageSize] = useState(150);
    const animation = () => {
      
        setImageSize(45)
    }
  
    function updateCategories() {
        faculties = [];
        faculties.push(faculty);
        selectedFaculty(faculty)
        animation()
    }

    return (
        <div className="preference-category-container">
            <div onClick={() => {
                updateCategories(faculty)
            }}>
                <img className="category-image" style={
                    {
                        borderRadius: 4,
                        // height: imageSize,
                        // width: imageSize,
                        boxShadow: selected ? "0 15px 35px rgba(0, -20, 1, 0.15)" : "",
                    }
                }
                    src={selected ? image?.default : fadedImage?.default}
                />
            </div>
            <h4 className="category-title">{name}</h4>
        </div>
    )
}

const PreferenceModal = ({toggleShowToast}) => {
    const { user } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(true);
    const [submitMessage, setSubmitMessage] = useState(null);
    const [faculty, setFaculty] = useState(null);
    const [topToastMsg, setTopToastMsg] = useState(null)
    const selectedFaculty = (selectedFaculty) => {
        setFaculty(selectedFaculty);
        setSubmitMessage(null)
        // console.log("selectedFaculty", selectedFaculty)
    }
    async function submitPreference() {
        try {
       
            if (faculty) {
                firebase.firestore().collection("Web-User-Data")
                    .doc(user?.uid)
                    .collection('User-Preference')
                    .doc(user?.uid)
                    .set({
                        user_id: user?.uid,
                        user_email: user?.email,
                        preference: faculty
                    }).then((res) => {
                        setShowModal(false)
                        toast.success("Preference successfully added")
                        toggleShowToast()
                    })
            } else {
                setSubmitMessage("Please select your preference *")
            }
        } catch (err) {
            console.log("Error submitting user preference", err)
        }
    }


    return (
        <>
            <div className="preference-modal-wrapper" style={{ display: !showModal && 'none' }}>
                <div className="preference-modal-container">
                    <h4 className="preference-title">Please select your preferences</h4>
                    <div className="preference-category">
                        {preferencesCategories.map((item, index) => {
                            return (
                                <div key={item.faculty + index}>
                                    {
                                        item.faculty == faculty?.faculty ?
                                            <CategoryOption
                                                faculty={item}
                                                name={item.faculty}
                                                image={item.image}
                                                fadedImage={item.fadedImage}
                                                selected={true}
                                                selectedFaculty={selectedFaculty}
                                            />
                                            :
                                            <CategoryOption
                                                faculty={item}
                                                name={item.faculty}
                                                image={item.image}
                                                fadedImage={item.fadedImage}
                                                selected={false}
                                                selectedFaculty={selectedFaculty}
                                            />
                                    }
                                </div>
                            )
                        })}
                    </div>
                    
                    <p style={{color: 'red' }}>{submitMessage && submitMessage}</p>
                    <button onClick={() => submitPreference()} className="viewbook-btn button-banner-active">
                        Let's get started    
                        <BsArrowRight/>
                    </button>
                </div>
            </div>
        </>
    )
}

export default PreferenceModal