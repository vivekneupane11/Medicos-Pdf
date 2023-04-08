import React, { useState, useEffect } from 'react'
import firebase from "firebase";
import "firebase/auth";
import { FaFacebook, FaInstagram, FaSlack, FaTwitter } from 'react-icons/fa';
import { BiBadge, BiCalendar, BiEditAlt, BiEnvelope, BiGlobe, BiHeart, BiNote, BiText, BiUser } from 'react-icons/bi';
import { TiShoppingBag } from 'react-icons/ti';
import { toast } from 'react-toastify';

import { Headings } from '../../../components/global/headings';
import { Paragraphs } from '../../../components/global/paragraphs';
import './_additional.scss';

export const AdditionalDetails = ({ user, edit }) => {
    const [enableEdit, setEnableEdit] = useState(false);
    const [email, setEmail] = useState("");
    const [language, setLanguage] = useState("");
    const [gender, setGender] = useState("");
    const [nickname, setNickname] = useState("");
    const [working, setWorking] = useState("");
    const [education, setEducation] = useState("");
    const [facebook, setFacebook] = useState("")
    const [instagram, setInstagram] = useState("")
    const [twitter, setTwitter] = useState("")

    useEffect(() => {
        let isMounted = true;
        if (isMounted && user?.user_id) {
            try {
                firebase.firestore().collection('Web-User-Data')
                    .doc(user?.user_id)
                    .collection('Additional-Details')
                    .doc(user?.user_id)
                    .get()
                    .then((res) => {

                        if (res.data()) {
                            let data = res.data();
                            setEmail(data.email);
                            setLanguage(data.language);
                            setGender(data.gender);
                            setNickname(data.nickname);
                            setWorking(data.working);
                            setEducation(data.education);
                            setFacebook(data?.facebook);
                            setInstagram(data?.instagram);
                            setTwitter(data?.twitter);
                        }
                    })
            } catch (error) {
                console.log("Error while fetching user's additional information")
            }
        }
        return () => {
            isMounted = false;
        }
    }, [user?.user_id])

    const saveAdditionalDetails = () => {
        if (user?.user_id) {
            try {
                firebase.firestore().collection("Web-User-Data")
                    .doc(user?.user_id)
                    .collection('Additional-Details')
                    .doc(user?.user_id)
                    .update({
                        user_id: user?.user_id,
                        email: email,
                        language: language,
                        gender: gender,
                        nickname: nickname,
                        working: working,
                        education: education,
                        facebook:facebook,
                        instagram:instagram,
                        twitter:twitter
                    })
                    .then((res) => {
                        toast.success("Saved Successfully")
                        setEnableEdit(false)
                    })
            } catch (error) {
                console.log("Error while saving additional data", error);
            }
        }
    }



    return (
        <div className="additionalDetails-wrapper">
            <div className="additionalDetails-wrapper-top">
                <div className="additionalDetails-wrapper-top-heading">
                    <Headings type="heading5" content="Additional Details" />
                </div>
                {
                    edit &&
                    <div onClick={() => setEnableEdit(!enableEdit)} className="additionalDetails-wrapper-top-edit">
                        <div className="additionalDetails-wrapper-top-edit-icon">
                            <BiEditAlt />
                        </div>
                    </div>
                }
            </div>
            <div className="additionalDetails-wrapper-bottom">
                <div className="additionalDetails-wrapper-bottom-details">
                    <div className="additionalDetails-wrapper-bottom-details-left">
                        <div className="icon">
                            <BiEnvelope />
                        </div>
                    </div>
                    <div className="additionalDetails-wrapper-bottom-details-right">
                        <div className="additionalDetails-wrapper-bottom-details-right-label">
                            <Paragraphs type="muted-text" content="Email" />
                        </div>
                        <div className="additionalDetails-wrapper-bottom-details-right-desc">
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={!enableEdit && true}
                                className={enableEdit ? "input-enable-edit" : ""}
                                value={email}
                                placeholder="+ Email Address"
                                style={{
                                    border: !enableEdit && 'none',
                                    backgroundColor: 'transparent'
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="additionalDetails-wrapper-bottom-details">
                    <div className="additionalDetails-wrapper-bottom-details-left">
                        <div className="icon">
                            <BiGlobe />
                        </div>
                    </div>
                    <div className="additionalDetails-wrapper-bottom-details-right">
                        <div className="additionalDetails-wrapper-bottom-details-right-label">
                            <Paragraphs type="muted-text" content="Languages" />
                        </div>
                        <div className="additionalDetails-wrapper-bottom-details-right-desc">
                            <input
                                onChange={(e) => setLanguage(e.target.value)}
                                disabled={!enableEdit && true}
                                className={enableEdit ? "input-enable-edit" : ""}
                                value={language}
                                placeholder="+ English, Nepali"
                                style={{
                                    border: !enableEdit && 'none',
                                    backgroundColor: 'transparent'
                                }}
                            />                        </div>
                    </div>
                </div>

                <div className="additionalDetails-wrapper-bottom-details">
                    <div className="additionalDetails-wrapper-bottom-details-left">
                        <div className="icon">
                            <BiHeart />

                        </div>
                    </div>
                    <div className="additionalDetails-wrapper-bottom-details-right">
                        <div className="additionalDetails-wrapper-bottom-details-right-label">
                            <Paragraphs type="muted-text" content="Prefered Gender" />

                        </div>
                        <div className="additionalDetails-wrapper-bottom-details-right-desc">


                            <input
                                onChange={(e) => setGender(e.target.value)}
                                disabled={!enableEdit && true}
                                className={enableEdit ? "input-enable-edit" : ""}
                                value={gender}
                                placeholder="+ He/She/Others"
                                style={{
                                    border: !enableEdit && 'none',
                                    backgroundColor: 'transparent'
                                }}
                            />
                        </div>

                    </div>

                </div>

                <div className="additionalDetails-wrapper-bottom-details">
                    <div className="additionalDetails-wrapper-bottom-details-left">
                        <div className="icon">
                            <BiUser />

                        </div>

                    </div>
                    <div className="additionalDetails-wrapper-bottom-details-right">
                        <div className="additionalDetails-wrapper-bottom-details-right-label">
                            <Paragraphs type="muted-text" content="Nickname" />

                        </div>
                        <div className="additionalDetails-wrapper-bottom-details-right-desc">


                            <input
                                onChange={(e) => setNickname(e.target.value)}
                                disabled={!enableEdit && true}
                                className={enableEdit ? "input-enable-edit" : ""}
                                value={nickname}
                                placeholder="+ Your nickname"
                                style={{
                                    border: !enableEdit && 'none',
                                    backgroundColor: 'transparent'
                                }}
                            />
                        </div>

                    </div>

                </div>

                <div className="additionalDetails-wrapper-bottom-details">
                    <div className="additionalDetails-wrapper-bottom-details-left">
                        <div className="icon">
                            <TiShoppingBag />

                        </div>

                    </div>
                    <div className="additionalDetails-wrapper-bottom-details-right">
                        <div className="additionalDetails-wrapper-bottom-details-right-label">
                            <Paragraphs type="muted-text" content="Working" />

                        </div>
                        <div className="additionalDetails-wrapper-bottom-details-right-desc">
                            <input
                                onChange={(e) => setWorking(e.target.value)}
                                disabled={!enableEdit && true}
                                className={enableEdit ? "input-enable-edit" : ""}
                                value={working}
                                placeholder="+ Your Working"
                                style={{
                                    border: !enableEdit && 'none',
                                    backgroundColor: 'transparent'
                                }}
                            />
                        </div>

                    </div>

                </div>

                <div className="additionalDetails-wrapper-bottom-details">
                    <div className="additionalDetails-wrapper-bottom-details-left">
                        <div className="icon">
                            <BiNote />
                        </div>
                    </div>
                    <div className="additionalDetails-wrapper-bottom-details-right">
                        <div className="additionalDetails-wrapper-bottom-details-right-label">
                            <Paragraphs type="muted-text" content="Education" />
                        </div>
                        <div className="additionalDetails-wrapper-bottom-details-right-desc">
                            <input
                                onChange={(e) => setEducation(e.target.value)}
                                disabled={!enableEdit && true}
                                className={enableEdit ? "input-enable-edit" : ""}
                                value={education}
                                placeholder="+ Your Education"
                                style={{
                                    border: !enableEdit && 'none',
                                    backgroundColor: 'transparent'
                                }}
                            />
                        </div>

                    </div>

                </div>

            </div>


            {
                enableEdit &&
                <div>
                    <div className="additionalDetails-wrapper-top" style={{ marginTop: 19 }}>
                        <div className="additionalDetails-wrapper-top-heading">
                            <Headings type="heading5" content="Social Links" />
                        </div>
                    </div>
                    <div className="additionalDetails-wrapper-bottom">
                        <div className="additionalDetails-wrapper-bottom-details">
                            <div className="additionalDetails-wrapper-bottom-details-left">
                                <div className="icon">
                                    <FaFacebook />
                                </div>
                            </div>
                            <div className="additionalDetails-wrapper-bottom-details-right">
                                <div className="additionalDetails-wrapper-bottom-details-right-label">
                                    <Paragraphs type="muted-text" content="Facebook" />
                                </div>
                                <div className="additionalDetails-wrapper-bottom-details-right-desc">
                                    <input
                                        onChange={(e) => setFacebook(e.target.value)}
                                        disabled={!enableEdit && true}
                                        className={enableEdit ? "input-enable-edit" : ""}
                                        value={facebook}
                                        placeholder="+ Facebook"
                                        style={{
                                            border: !enableEdit && 'none',
                                            backgroundColor: 'transparent'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="additionalDetails-wrapper-bottom-details">
                            <div className="additionalDetails-wrapper-bottom-details-left">
                                <div className="icon">
                                    <FaInstagram />
                                </div>
                            </div>
                            <div className="additionalDetails-wrapper-bottom-details-right">
                                <div className="additionalDetails-wrapper-bottom-details-right-label">
                                    <Paragraphs type="muted-text" content="Instagram" />
                                </div>
                                <div className="additionalDetails-wrapper-bottom-details-right-desc">
                                    <input
                                        onChange={(e) => setInstagram(e.target.value)}
                                        disabled={!enableEdit && true}
                                        className={enableEdit ? "input-enable-edit" : ""}
                                        value={instagram}
                                        placeholder="+ Instagram"
                                        style={{
                                            border: !enableEdit && 'none',
                                            backgroundColor: 'transparent'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="additionalDetails-wrapper-bottom-details">
                            <div className="additionalDetails-wrapper-bottom-details-left">
                                <div className="icon">
                                    <FaTwitter />
                                </div>
                            </div>
                            <div className="additionalDetails-wrapper-bottom-details-right">
                                <div className="additionalDetails-wrapper-bottom-details-right-label">
                                    <Paragraphs type="muted-text" content="Twitter" />

                                </div>
                                <div className="additionalDetails-wrapper-bottom-details-right-desc">
                                    <input
                                        onChange={(e) => setTwitter(e.target.value)}
                                        disabled={!enableEdit && true}
                                        className={enableEdit ? "input-enable-edit" : ""}
                                        value={twitter}
                                        placeholder="+ Twitter"
                                        style={{
                                            border: !enableEdit && 'none',
                                            backgroundColor: 'transparent'
                                        }}
                                    />
                                </div>

                            </div>

                        </div>
                    </div>
                    <div onClick={() => saveAdditionalDetails()} className="additionalDetails-button">
                        <p>Save</p>
                    </div>
                </div>

            }

        </div>
    )
}
