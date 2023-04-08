// import firebase from 'firebase/compat';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
// import { BiEditAlt } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { Headings } from '../../../../components/global/headings';
// import useLocalStorage from '../../../../customHooks/useLocalStorage';
import './_summary.scss';
// import { doc, getFirestore, onSnapshot, updateDoc } from 'firebase/firestore';
import PencileIcon from '../../../../components/global/icons/pencile'
import { get } from 'lodash';

 const Summary = ({edit}) => {
  
    const { userId } = useParams();
    const [summaryEnableEdit, setSummaryEnableEdit] = useState(false);
    const [summary, setSummary] = useState("");
    // const [usernameLocalStorage, setUsernameLocalStorage] = useLocalStorage("username", null);
    // const db = getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../../../../firebase/firestore')
        ])
        .then(([firestore])=>{
            return {firestore}
        })
    };
   async function saveSummary() {
        try {
            const {firestore:{db,updateDoc,doc}}=await getFirebaseAll()
            if (userId) {
                // firebase.firestore().collection("Web-User-Data")
                //     .doc(userId)
                //     .collection('Additional-Details')
                //     .doc(userId)
                //     .update({
                //         summary: summary
                //     })
                    updateDoc(doc(db,"Web-User-Data",userId,'Additional-Details',userId)
                    ,{
                        summary: summary
                    })
                    .then((res) => {
                        toast.success("Summary Saved Successfully",{theme:'dark',hideProgressBar:true})
                        setSummaryEnableEdit(false)
                    })
            }
        } catch (error) {
            console.log('Error saving summary', error);
        }
    }


    useEffect(async() => {
        let isMounted = true;
        if (isMounted ) {
            try {
                const{firestore:{db,doc,onSnapshot}}=await getFirebaseAll();
                if (userId) {
                    // firebase.firestore().collection('Web-User-Data')
                    //     .doc(userId)
                    //     .collection('Additional-Details')
                    //     .doc(userId)
                        const docRef=doc(db,'Web-User-Data',userId,'Additional-Details',userId)
                        onSnapshot(docRef,(res) => {
                            if (res.data()) {
                                let data = res.data();
                                setSummary(data.summary)
                            }
                        })
                }
            } catch (error) {
                console.log("Error while fetching user's summary")
            }
        }
        return () => {
            isMounted = false;
        }
    }, [userId])

    const clickhandlersetsummary = () => setSummaryEnableEdit(!summaryEnableEdit)
    const clickhandlersavesummary = () => saveSummary()
    return (
        <div className="summary-wrapper">
            <div className="summary-wrapper-top">
                <div className="summary-wrapper-top-heading">
                    <Headings type="heading5" content="Summary" />
                </div>
               {
                   edit &&
                   <div className="summary-wrapper-top-edit">
                   <div  onClick={clickhandlersetsummary}>
                       <PencileIcon className="summary-wrapper-top-edit-icon" />
                   </div>
                  </div>
               }

            </div>
            <div className="summary-wrapper-details">
                <textarea
                    placeholder="Add story to your profile"
                    disabled={!summaryEnableEdit && true}
                    className='summary-input'
                    rows={10}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                />
                {
                    summaryEnableEdit &&
                    <div onClick={clickhandlersavesummary} className="summary-save-button">
                        <p>Save</p>
                    </div>
                }
            </div>


        </div>
    )
}


export default React.memo(Summary)