import React, { useEffect, useState } from 'react'
import './_topCard.scss';
import firebase from 'firebase';
import background from '../../../images/art1.jpg'
import { Images } from '../../../components/global/images';
import { BiEditAlt } from 'react-icons/bi';
import { BsBookmarkDash } from 'react-icons/bs';
import { FaFacebook, FaInstagram, FaSlack, FaTwitter } from 'react-icons/fa';
import { Headings } from '../../../components/global/headings';
import { Paragraphs } from '../../../components/global/paragraphs';

export const TopCard = ({ user }) => {
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
                    .onSnapshot((res) => {

                        if (res.data()) {
                            let data = res.data();
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

    return (
        <div className="topcard-wrapper">
            <div className="topcard-wrapper-top" style={{ backgroundImage: `url(${background})` }}>

            </div>
            <div className="topcard-wrapper-bottom">
                <div className="topcard-wrapper-bottom-image">
                    <Images type="circle" Image={user?.photoURL}
                        width={180} height={180} />

                </div>

                <div className="topcard-wrapper-bottom-right">
                    <div className="topcard-wrapper-bottom-right-top">
                        <div className="topcard-wrapper-bottom-right-top-profileDetails">
                            <Headings type="heading3" content={user?.displayName} />
                            {/* <div className="topcard-wrapper-bottom-right-top-profileDetails-position ">
                                <Paragraphs type="muted-text" content={user?.email} />
                            </div> */}
                            <div className="address">
                                <Paragraphs type="heading-text" content={user?.email} />
                            </div>

                        </div>
                        {/* 
                        TODO----EDIT PROFILE FUNCTIONALITY
                        <div className="topcard-wrapper-bottom-right-top-editProfile">
                            <div className="topcard-wrapper-bottom-right-top-editProfile-content">
                                <div className="topcard-wrapper-bottom-right-top-editProfile-content-icon">
                                <BiEditAlt/>

                                </div>
                                <div className="topcard-wrapper-bottom-right-top-editProfile-content-heading">
                                    <Headings type="heading6" content="Edit Profile"/>
                                </div>
                            </div>
                    </div> 
                    */}

                    </div>
                    <div className="topcard-wrapper-bottom-right-bottom">
                        <div className="topcard-wrapper-bottom-right-bottom-socialLink">
                            {
                                facebook == '' ?
                                    <div className="topcard-wrapper-bottom-right-bottom-socialLink-icon">
                                        <FaFacebook />
                                    </div>
                                    :
                                    <a href={facebook} target="_blank" className="topcard-wrapper-bottom-right-bottom-socialLink-icon">
                                        <FaFacebook />
                                    </a>
                            }
                            {
                                instagram == '' ?
                                    <div className="topcard-wrapper-bottom-right-bottom-socialLink-icon">
                                        <FaInstagram />
                                    </div>
                                    :
                                    <a href={instagram} target="_blank" className="topcard-wrapper-bottom-right-bottom-socialLink-icon">
                                        <FaInstagram />
                                    </a>
                            }
                            {
                                twitter == '' ?
                                    <div className="topcard-wrapper-bottom-right-bottom-socialLink-icon">
                                        <FaTwitter />
                                    </div>
                                    :
                                    <a href={twitter} target="_blank" className="topcard-wrapper-bottom-right-bottom-socialLink-icon">
                                        <FaTwitter />
                                    </a>
                            }
                        </div>
                        {/* <div className="topcard-wrapper-bottom-right-bottom-right">
                            <div className="topcard-wrapper-bottom-right-bottom-right-icon">
                                <BsBookmarkDash />

                            </div>

                        </div> */}

                    </div>

                </div>


            </div>

        </div>
    )
}
