
import React, { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorMessage, Field, Formik } from 'formik';
import * as Yup from 'yup';
//local imports
import { preferencesCategories } from '../../../constants/Preference/PreferencesCategories';
import { AuthContext } from '../../signUp/authMethods/authentication';
import './index.scss';
import { CSSTransition, TransitionGroup } from "react-transition-group";
// import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";

import ArrowRight from '../icons/arrow_right';

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

    const clickhandlerupdate = () => {
        updateCategories(faculty)
    }
    
    return (
        <TransitionGroup>
        <div className="preference-category-container">
            <div onClick={clickhandlerupdate}>
            
                <CSSTransition
                classNames="prefImage"
                timeout={300}
                in={true}
                appear={true}
                
                >
                <img className="category-image" style={
                    {
                        borderRadius: 4,
                        // height: imageSize,
                        // width: imageSize,
                        boxShadow: selected ? "0 15px 35px rgba(0, -20, 1, 0.15)" : "",
                    }
                }
                    alt={name}
                    src={selected ? image : fadedImage}
                />
                </CSSTransition>
                
            </div>
            <h4 className="category-title">{name}</h4>
        </div>
        </TransitionGroup>
    )
}

const PreferenceModal = ({ toggleShowToast }) => {
    const { user } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(true);
    const [submitMessage, setSubmitMessage] = useState(null);
    const [faculty, setFaculty] = useState(null);

    const [userName, setUserName] = useState(null)


    // const db = getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../../../firebase/firestore')
        ])
        .then(([firestore])=>{
            return{firestore}
        })
    }
    const [showUserInput, setShowUserInput] = useState(null)
    const renderError = (message) => <p className="error-msg">{message}</p>;

    const selectedFaculty = (selectedFaculty) => {
        setFaculty(selectedFaculty);
        setSubmitMessage(null)
    }
    async function submitPreference() {
        try {
            const {firestore:{db,setDoc,doc}}=await getFirebaseAll()
            if (faculty) {
               
                    setDoc(doc(db,"Web-User-Data",user?.uid,'User-Preference',user?.uid),
                    {
                        user_id: user?.uid,
                        user_email: user?.email,
                        preference: faculty
                    })
                    .then((res) => {
                        setShowModal(false)
                        toast.success("Preference successfully added",{theme:'dark',hideProgressBar:true})
                        toggleShowToast && toggleShowToast()
                    })
            } else {
                setSubmitMessage("Please select your preference *")
                setTimeout(() => {setSubmitMessage(null)}, 2000);
            }
        } catch (err) {
            console.log("Error submitting user preference", err)
        }
    }


    useEffect(async() => {
        let isMounted = true;
        if (isMounted) {
            try {
                const{firestore:{db,query,collection,where,getDocs}}=await getFirebaseAll()
                    const colRef = query(collection(db,"UserName"),
                    where('userUID','==',user.uid))
                    getDocs(colRef)
                    .then((res) => {
                        if(!res.empty){
                            setUserName(res.docs[0].id)
                            setShowUserInput(false)
                        }
                        else{
                            setShowUserInput(true)
                        }
                    })
                   
            } catch (error) {
                console.log("Error while fetching userName");
            }
        }

        return () => {
            isMounted = false
        }
    }, [showUserInput,user.uid])


    const SaveDataOnSubmit = async({ values, setSubmitting, resetForm }) => {

        if (faculty && values) {
                try {
                const{firestore:{db,query,collection,where,getDocs,setDoc,doc}}=await getFirebaseAll()
                  
                        const colRef = query(collection(db,"UserName"),
                        where('userName','==',values.username))
                        getDocs(colRef)
                        .then((res) => {
                            if(!res.empty){
                                    setSubmitting(false)
                                    resetForm();
                                    setSubmitMessage("user name already taken.chose another")
                                    setTimeout(() => {setSubmitMessage(null)}, 2000);
                            }
                            else {
                                submitPreference()
                                let data = {
                                    userName: values.username,
                                    userUID: user.uid,
                                }
                              
                                setDoc(doc(db,"UserName",values.username),data)
                                toast.success('your username successfully added',{theme:'dark',hideProgressBar:true})
                                setSubmitting(false)
                                resetForm();
                
                            }
                        })
                       
                } catch (error) {
                    console.log("Error while fetching userName");
                }

        }
        else {
            setSubmitMessage("Please select both preference and username")
            setTimeout(() => {setSubmitMessage(null)},2000);
            setSubmitting(false)
            resetForm();
        }


    }

    const clickhandlersubmit = () => submitPreference()
    return (
        <>
            <div className="preference-modal-wrapper" style={{ display: !showModal && 'none' }}>
                <div className="preference-modal-container">
                    <h4 className="preference-title">Please select your preferences</h4>


                    {
                        userName &&
                        <p className='preferenceModal-username'>{userName}</p>
                    }

                    <div className="preference-category">
                        {preferencesCategories.map((item, index) => {
                            return (
                                <div key={item.faculty + index}>
                                    {
                                        item.faculty === faculty?.faculty ?
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

                    <p className='submitmessage'>{submitMessage && submitMessage}</p>
                    <Formik
                        initialValues={{
                            username: '',

                        }}
                        validationSchema={Yup.object({
                            username: Yup.string()
                                .min(5, 'Must be 5 character or more')
                                .required('Required'),
                        })}
                        onSubmit={(values, { setSubmitting, resetForm }) => {

                            SaveDataOnSubmit({ values, setSubmitting, resetForm })



                        }}
                    >
                        {(props) => (
                            <form className="preferenceModal-form" onSubmit={props.handleSubmit}>
                                {
                                    showUserInput &&
                                    <>
                                        <div className="preferenceModal-form-username">
                                            <label className="preferenceModal-form-username-label">UserName</label>
                                            <Field
                                                type="text"
                                                name="username"
                                                placeholder='Enter your userName'
                                                onChange={props.handleChange}
                                                value={props.values.username}
                                                required
                                            />

                                        </div>
                                        <ErrorMessage name="name" render={renderError} />
                                    </>
                                }

                                {
                                    showUserInput ?
                                        <button type="submit" className="preferenceModal-viewbook-btn preferenceModal-button-banner-active" disabled={props.isSubmitting} >
                                            submit
                                            <ArrowRight />
                                        </button>
                                        :
                                        <button onClick={clickhandlersubmit} className="preferenceModal-viewbook-btn preferenceModal-button-banner-active">
                                            Let's get started
                                            <ArrowRight/>
                                        </button>
                                }



                            </form>
                        )}
                    </Formik>



                </div>
            </div>
        </>
    )
}

export default PreferenceModal