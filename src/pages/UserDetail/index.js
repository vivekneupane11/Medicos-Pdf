import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { debounce } from "debounce";
// import { BiError } from "react-icons/bi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DisplayTitle } from "../../components/global/Titles";
import './index.scss'
import { Button } from '../../../src/components/global/button';
import { preferencesCategories } from "../../constants/Preference/PreferencesCategories";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../components/signUp/authMethods/authentication";
import useLocalStorage from "../../customHooks/useLocalStorage";

import Loadable from 'react-loadable';
// import { doc, getDoc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";
import ExclamanationTriangle from '../../components/global/icons/exclamanation_Triangle';


const LoadableLoginModal = Loadable({
    loader: () => import('../../components/global/loginModel').then(module => module.LoginModal),
    loading() {
        return <div className='loading'>Loading...</div>
    }
});

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
                <img loading="lazy" className="category-image" style={
                    {
                        borderRadius: 4,
                        boxShadow: selected ? "0 15px 35px rgba(0, -20, 1, 0.15)" : "",
                    }
                }
                    src={selected ? image : fadedImage}
                    alt={name}
                />
            </div>
            <h4 className="category-title">{name}</h4>
        </div>
    )
}


const UserDetail = () => {
    const history = useHistory();
    const usernameinputRef = useRef()
    const { user, username: u_name, setUsername: setAuthUsername } = useContext(AuthContext);
    const [username, setUsername] = useState(u_name);
    const [preference, setPreference] = useLocalStorage('preference', null);
    const [submitMessage, setSubmitMessage] = useState(null);
    const [faculty, setFaculty] = useState(null);
    const [usernameError, setUsernameError] = useState();
    const [preferenceError, setPreferenceError] = useState();
    const [showFormModel, setShowFormModel] = useState(false)
    // const db = getFirestore();
    const  getFirebaseAll=()=>{
        return Promise.all([
            import('../../firebase/firestore')
        ])
        .then(([firestore])=>{
            return{firestore}
        })
    }
    const selectedFaculty = (selectedFaculty) => {
        setPreferenceError()
        setFaculty(selectedFaculty);
        setSubmitMessage(null)
    }

    const FormModel = useCallback(
        (dontShow) => {

            if (dontShow === false) {
                setShowFormModel(false)
                history.goBack()
            }
        },
        [history],
    )

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            if (user) {
                setShowFormModel(false)
                // setLoggedInState(true)
            }
            else {
                // setLoggedInState(false)
                setShowFormModel(true)
            }

        }

        return () => {
            isMounted = false
        }
    }, [user])
    async function submitPreference() {

        try { const{firestore:{db,doc,getDoc,setDoc}}=await getFirebaseAll()
            //if there is usernam ein inout value then check if it already exists [Username always has to be unique]
            //checking to resolve any sideeffect while 
            if ((usernameinputRef?.current?.value?.length && usernameinputRef?.current?.value == username) || (!usernameinputRef?.current?.value?.length)) {
                const docRef = doc(db, 'Web-User-Data', username, 'Additional-Details', username)

                getDoc(docRef).then((querySnapshot) => {

                    if (querySnapshot?.exists() && usernameinputRef?.current?.value?.length) {
                        toast.error("Username already exists", { theme: 'dark', hideProgressBar: true });
                    } else {
                        if (faculty && (username) && !usernameError) {
                            setDoc(doc(db, "Web-User-Data", username, 'User-Preference', username),
                                {
                                    user_id: user?.uid,
                                    user_email: user?.email,
                                    preference: faculty,
                                })

                                .then(() => {

                                    setDoc(doc(db, "Web-User-Data", username, 'Additional-Details', username),
                                        {
                                            user_id: user?.uid,
                                            email: user?.email,
                                            displayName: user?.displayName,
                                            photoURL: user?.photoURL,
                                            language: '',
                                            gender: '',
                                            nickname: '',
                                            joinedDate: '',
                                            working: '',
                                            education: '',
                                            summary: '',
                                            facebook: '',
                                            instagram: '',
                                            twitter: '',
                                            username: username,
                                            coverImageUrl: '',
                                        })

                                        .then(() => {
                                            setDoc(doc(db, "Web-Uid-To-Username", user?.uid),
                                                {
                                                    username: username
                                                }
                                            )

                                                .then(() => {
                                                    setPreference(faculty)
                                                    setAuthUsername(username)

                                                    toast.success("Account successfully added", { theme: 'dark', hideProgressBar: true });
                                                    history.push('/')
                                                })
                                        })
                                        .catch((err) => {
                                            console.log(err)

                                        })
                                })
                        } else {

                            setSubmitMessage("Please select your preference *")
                            setTimeout(() => { setSubmitMessage(null) }, 1000);
                        }
                    }
                })
            }

            if (!username) {
                setUsernameError('Please enter your username')
            }
            if (!faculty) {
                setPreferenceError('Please select your preference')
            }
        } catch (err) {
            console.log("Error submitting user preference", err)
        }
    }

    const addUsername = async(e) => {
        setUsernameError(null);
        e.preventDefault()
        try {
            const {firestore:{db,doc,getDoc}}=await getFirebaseAll()
            const docRef = doc(db, 'Web-User-Data', e.target.value, 'Additional-Details', e.target.value)
            // firebase.firestore().collection('Web-User-Data')
            //     .doc(e.target.value)
            //     .collection('Additional-Details')
            //     .doc(e.target.value)
            getDoc(docRef).then((querySnapshot) => {

                if (querySnapshot?.exists()) {
                    setUsernameError('Username already existed')
                }
            })
        } catch (error) {
            console.log('input error', error);
        }
        setUsername(e.target.value)
    }

    const ErrorMsg = ({ errorMsg }) => {
        return <div className='error-msg-container'>
            <ExclamanationTriangle className='icon' />
            <p className='error-msg'>{errorMsg}</p>
        </div>
    }
    const debounceAddUsername = debounce(addUsername, 2000)

    useEffect(async() => {
        let isMounted = true
        if (isMounted && user?.uid && !u_name) {
            try {
                const {firestore:{db,doc,onSnapshot,setDoc}}=await getFirebaseAll()
                let docId = user?.email.replace(/@gmail.com/g, '');
                // let docId = 'vivekneupane11'
                const docRef = doc(db, 'Web-User-Data', docId, 'Additional-Details', docId)
                // firebase.firestore().collection('Web-User-Data')
                //     .doc(docId)
                onSnapshot(docRef, (querySnapshot) => {
                    if (!querySnapshot?.exists()) {
                        // console.log('Email',docId);
                        setDoc(doc(db, "Web-Uid-To-Username", user?.uid),
                            {
                                username: docId
                            }
                        ).then(()=>{
                            setUsername(docId)
                            setAuthUsername(docId)
                        })
                    }
                })
            } catch (error) {
                console.log('input error', error);
            }
        }
        return () => {
            isMounted = false;
        }
    }, [user?.uid,  user?.email])

    //     useEffect(() => {
    //         let isMounted = true
    //         if (isMounted && user?.uid) {
    //             try {
    //                 const docRef = doc(db,'Web-Uid-To-Username',user?.uid)
    //                 // firebase.firestore().collection('Web-Uid-To-Username')
    //                 //     .doc(user?.uid)
    //                     onSnapshot(docRef,(querySnapshot) => {
    //                         const docRef =doc(db,"Web-User-Data",querySnapshot?.data()?.username,'User-Preference',querySnapshot?.data()?.username)
    //                         // firebase.firestore().collection("Web-User-Data")
    //                         //     .doc(querySnapshot?.data()?.username)
    //                         //     .collection('User-Preference')
    //                         //     .doc(querySnapshot?.data()?.username)
    //                             onSnapshot(docRef,(res) => {
    // if(res?.exists()){
    //   if(res?.data()?.preference)  setFaculty()

    // }
    //                             })
    //                     })
    //             } catch (error) {
    //                 console.log('input error', error);
    //             }
    //         }
    //         return () => {
    //             isMounted = false;
    //         }
    //     }, [user?.uid,db])

    return <div className='user-detail-page-container'>
        {
            showFormModel &&
            <LoadableLoginModal show={showFormModel} formModel={FormModel} />
        }
        {

            <div className='username-container'>
                <DisplayTitle title="Almost there !" type="display3" />
                <p>Finish creating your account for the full experience.</p>
                <div className='input-container'>
                    <div className="username">
                        <p className='label'>Your username</p>
                        {!u_name && !username && <input ref={usernameinputRef} type="text" onChange={debounceAddUsername} />
                        }
                        {u_name && username && <p className='text-focus'>{u_name}</p>
                        }
                        {usernameError &&
                            <ErrorMsg errorMsg={usernameError} />
                        }
                    </div>
                    <p className='label'>Your email</p>
                    <p className='text-focus'>{user?.email}</p>
                </div>
                {preferenceError &&
                    <ErrorMsg errorMsg={preferenceError} />
                }
            </div>
        }
        <div className='preference-heading'>
            <DisplayTitle title='Please select your preference' type='display3' />
        </div>
        <div className="preference-category">
            {preferencesCategories.map((item, index) => {

                return (
                    <div key={item.faculty + index}>
                        {
                            item?.faculty === faculty?.faculty ?
                                <CategoryOption
                                    faculty={item}
                                    name={item?.faculty}
                                    image={item?.image}
                                    fadedImage={item?.fadedImage}
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
        <div className="preference-create-button-container" onClick={submitPreference}>
            <Button type="primary-rounded" label="Create Account" labelColor="white" />
        </div>
    </div>

}


export default UserDetail;