import React, { useState, useEffect } from 'react'
import './_summary.scss';
import firebase from 'firebase';
import { Headings } from '../../../../components/global/headings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BiEditAlt } from 'react-icons/bi';
import { toast } from 'react-toastify';

export const Summary = ({ user }) => {
    const [summaryEnableEdit, setSummaryEnableEdit] = useState(false);
    const [summary, setSummary] = useState("");

    useEffect(() => {
        let isMounted = true;
        if (isMounted && user?.uid) {
            try {
                firebase.firestore().collection('Web-User-Data')
                    .doc(user?.uid)
                    .collection('Additional-Details')
                    .doc(user?.uid)
                    .onSnapshot((res) => {

                        if (res.data()) {
                            let data = res.data();
                            setSummary(data.summary)
                        }
                    })
            } catch (error) {
                console.log("Error while fetching user's summary")
            }
        }
        return () => {
            isMounted = false;
        }
    }, [user?.uid])

    function saveSummary() {
        try {
            firebase.firestore().collection("Web-User-Data")
                .doc(user?.uid)
                .collection('Additional-Details')
                .doc(user?.uid)
                .update({
                    summary: summary
                })
                .then((res) => {
                    toast.success("Summary Saved Successfully")
                    setSummaryEnableEdit(false)
                })
        } catch (error) {
            console.log('Error saving summary', error);
        }
    }
    return (
        <div className="summary-wrapper">
            <div className="summary-wrapper-top">
                <div className="summary-wrapper-top-heading">
                    <Headings type="heading5" content="Summary" />
                </div>
                <div className="summary-wrapper-top-edit">
                    <div className="summary-wrapper-top-edit-icon">
                        <BiEditAlt onClick={() => setSummaryEnableEdit(!summaryEnableEdit)} />
                    </div>

                </div>

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
                    <div onClick={() => saveSummary()} className="summary-save-button">
                        <p>Save</p>
                    </div>
                }
            </div>


        </div>
    )
}
