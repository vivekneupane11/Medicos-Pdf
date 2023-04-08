import React, { useState, useContext, useEffect, useCallback } from 'react'
import { footerDetails } from '../constants/mock';
import { AuthContext } from '../signUp/authMethods/authentication';
import './_footer.scss';
import { logEventWithParams } from '../../functions/commonMethod';
import { newTab } from '../../functions/newTabMethod';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Loadable from 'react-loadable';
// import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';


  const LoadableLoginModal =  Loadable({
    loader: () => import('../../components/global/loginModel').then(module => module.LoginModal),
    loading() {
      return <div className='loading'>Loading...</div>
    }
  });

const Footer = () => {
    const { user } = useContext(AuthContext);
    const [email, setEmail] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showFormModel, setShowFormModel] = useState(false)
    const [showShare, setShowShare] = useState(false)
    // const db = getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../../firebase/firestore')
        ])
        .then(([firestore])=>{
            return{firestore}
        })
    }

   async function submitEmail() {
        if (user?.uid) {
            if (email) {
                try {
                    const {firestore:{db,getDoc,doc,setDoc}}=await getFirebaseAll()
                getDoc(doc(db,"Web-Newsletter-Subscriptions",user?.uid))
                .then((res) => {
                   if(res.data()){
                    toast.error(`Subscription is already enabled.`,{theme:'dark',hideProgressBar:true})

                   }else{
                    setDoc(doc(db,"Web-Newsletter-Subscriptions",user?.uid),
                    {
                        userId: user?.uid,
                            email: email

                    })
                    .then((res) => {
                        logEventWithParams('web_news_letter_subscription',{email:email})
                        setEmail(null);
                        toast.success(`Subscription completed`,{theme:'dark',hideProgressBar:true})
                    })
                   }
                    })



                } catch (error) {
                    console.log("Error while subscribing", error)
                }
            } else if (!email || email === "") {
                setErrorMessage("Please enter your valid email *")
            }
        } else {
            toast.error(`Please login in subscribe.`,{theme:'dark',hideProgressBar:true})
        }
    }

    function onChangeSetEmail(e) {
        setEmail(e.target.value)
        setErrorMessage(null)
    }

    const FormModel = useCallback(
        (dontShow) => {

            if (dontShow === false) {
                setShowFormModel(false)

            }
        },
        [],
    )

    useEffect(() => {
        if (user?.uid) {
            setShowFormModel(false)

        }
    }, [user?.uid])

    const handleSubmit = () => {
        setShowFormModel(true)
        setShowShare(true)
    }
    const handelSubmitEmail=() => submitEmail()
    const handelsubmit=() => handleSubmit()

    return (
        <div className='footer-Container'>
            <LoadableLoginModal show={showFormModel} formModel={FormModel} />
          
            <div className='footer-Container-top'>
                {footerDetails.footerTopDetails.map((data, index) => {
                    return <div key={index} className='footer-Container-top-card'>
                        <Link to={data.link} className='footer-Container-top-card-link'>
                            {data.icon}
                            <p className='footer-Container-top-card-link-count'>{data.count}</p>
                            <p className='footer-Container-top-card-link-title'>{data.title}</p>
                        </Link>

                    </div>
                })}
            </div>

            <div className='footer-Container-mid'>
                <div className='footer-Container-mid-container'>
                    {footerDetails.footerMidDetails.map((data, index) => {
                        return <div key={index} className='footer-Container-mid-container-links'>
                            <h3 className='footer-Container-mid-container-links-heading'>{data.heading}</h3>
                            <ul className='footer-Container-mid-container-links-subHeadingContainer'>
                                {data.links.map((data, index) => {
                                   
                                    return <li key={index} className='footer-Container-mid-container-links-subHeadingContainer-subheading'><div onClick={() => newTab(data.url,data.linkName,'footer_link_clicked')} className='footer-Container-mid-container-links-subHeadingContainer-subheading-link'>{data.linkName}</div></li>
                                })}
                            </ul>
                        </div>
                    })}
                </div>
                <div className='footer-Container-mid-newsletter'>
                    <h3 className='footer-Container-mid-newsletter-head1'>Medicos Int'l</h3>
                    <p className='footer-Container-mid-newsletter-head2'>Get the latest news about MedicosPdf new features and product updates.</p>
                    <p className='errormessage'>{errorMessage && errorMessage}</p>
                    <div className='footer-Container-mid-newsletter-subscribe'>
                        <input type='text' value={email ? email : ""} onChange={(e) => onChangeSetEmail(e)} placeholder='Enter your email' />

                        {
                            user ?
                                <button onClick={handelSubmitEmail} className='footer-Container-mid-newsletter-subscribe-btn'>subscribe</button>
                                :
                                <button onClick={handelsubmit} className='footer-Container-mid-newsletter-subscribe-btn'>subscribe</button>
                        }


                    </div>
                </div>
            </div>

            <div className='footer-Container-bottom'>
                <ul className='footer-Container-bottom-left'>
                    {footerDetails.footerBottomDetails.map((data, index) => {
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
