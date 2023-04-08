import React, { useState, useEffect, useContext } from 'react'
import './_profilePreference.scss'
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { preferencesCategories } from '../../../constants/Preference/PreferencesCategories';
import firebase from 'firebase';
import { AuthContext } from '../../../components/signUp/authMethods/authentication';
import Loading from '../../../components/loading';
import { DisplayTitle } from '../../../components/global/Titles';
import { Button } from '../../../components/global/button';
import PreferenceModal from '../../../components/global/preferenceModal';

const ProfilePreference = () => {
    const { user } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false)
    const [preferenceData, setPreferenceData] = useState(null);
    const toggleShowToast=()=>{
        setShowModal(!showModal);
    }

    useEffect(() => {
        let isMounted = true;
        try {
            // setLoadingPreference(true);

            firebase.firestore().collection("Web-User-Data")
                .doc(user?.uid)
                .collection('User-Preference')
                .doc(user?.uid)
                .onSnapshot(querySnapshot => {
                    let preference = querySnapshot.data();

                    if (isMounted) {
                      
                        setPreferenceData(preference);
                    }
                });
        }
        catch (err) {
            console.log('err from tryCatch', err)
        }


        return () => {
            isMounted = false;

        }
    }, [])

    return (
        <>
            {
                showModal && <PreferenceModal toggleShowToast={toggleShowToast}/>
            }
            <div className="profilePreference-container">
                <DisplayTitle title="Your preference is selected as" type='display3' />
                {/* {preferenceData?.preference?.name} */}
                <img src={preferenceData?.preference?.image?.default} className="category-image" />
                <DisplayTitle title={preferenceData?.preference?.faculty} type='display4' />
                <div onClick={()=>setShowModal(!showModal)}>
                    <Button type="primary-outline-rounded" label="Change your preference" labelColor="black" />
                </div>
            </div>
        </>
    )
}

export default ProfilePreference
