import React, { useState, useContext } from 'react'
import firebase from "firebase";

import './_footer.scss'
import { AuthContext } from '../signUp/authMethods/authentication';

const Footer = ({ details }) => {
    const { user } = useContext(AuthContext);
    const firestoreDatabase = firebase.firestore();
    const [email, setEmail] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const newTab=(url)=>{
        window.open(
           url, "_blank");
    }
    function submitEmail() {
        if (user?.uid) {
            if (email) {
                try {
                    firestoreDatabase.collection("Web-Newsletter-Subscriptions")
                        .doc(user?.uid)
                        .set(
                            {
                                userId: user?.uid,
                                email: email
                            }
                        ).then((res) => {
                            setEmail(null);
                            alert("Subscription successful")
                        })
                } catch (error) {
                    console.log("Error while subscribing", error)
                }
            }else if(!email || email == ""){
                setErrorMessage("Please enter your valid email *")
            }
        }else{
            alert("Please login your account")
        }
    }

    function onChangeSetEmail(e){
        setEmail(e.target.value)
        setErrorMessage(null)
    }

    return (
        <div className='footer-Container'>

            <div className='footer-Container-top'>
                {details.footerTopDetails.map((data, index) => {

                    return <div key={index} className='footer-Container-top-card'>
                        <a href={data.link} className='footer-Container-top-card-link'>
                            <img src={data.image} alt={data.title} />
                            <p className='footer-Container-top-card-link-count'>{data.count}</p>
                            <p className='footer-Container-top-card-link-title'>{data.title}</p>
                        </a>

                    </div>
                })}
            </div>

            <div className='footer-Container-mid'>
                <div className='footer-Container-mid-container'>
                    {details.footerMidDetails.map((data, index) => {
                        return <div key={index} className='footer-Container-mid-container-links'>
                            <h3 className='footer-Container-mid-container-links-heading'>{data.heading}</h3>
                            <ul className='footer-Container-mid-container-links-subHeadingContainer'>
                                {data.links.map((data, index) => {
                                    return <li key={index} className='footer-Container-mid-container-links-subHeadingContainer-subheading'><a  onClick={()=>newTab(data.url)} className='footer-Container-mid-container-links-subHeadingContainer-subheading-link'>{data.linkName}</a></li>
                                })}
                            </ul>
                        </div>
                    })}
                </div>
                <div className='footer-Container-mid-newsletter'>
                    <h3 className='footer-Container-mid-newsletter-head1'>Medicos Int'l</h3>
                    <p className='footer-Container-mid-newsletter-head2'>Get the latest news about MedicosPdf new features and product updates.</p>
                    <p style={{color:'red'}}>{errorMessage && errorMessage}</p>
                    <div className='footer-Container-mid-newsletter-subscribe'>
                        <input type='text' value={email ? email : ""} onChange={(e) => onChangeSetEmail(e)} placeholder='Enter your email' />
                        <button onClick={()=>submitEmail()} className='footer-Container-mid-newsletter-subscribe-btn'>subscribe</button>
                    </div>
                </div>
            </div>

            <div className='footer-Container-bottom'>
                <ul className='footer-Container-bottom-left'>
                    {details.footerBottomDetails.map((data, index) => {
                        return <li key={index}><a href={data.link}>{data.title}</a></li>
                    })
                    }
                </ul>
                <p className='footer-Container-bottom-right'>{`Copyright © ${new Date().getFullYear()} `}<span>Medicos Int'l ®</span></p>
            </div>

        </div>
    )
}

export default Footer
