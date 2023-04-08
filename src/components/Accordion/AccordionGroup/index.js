import React, { useEffect, useState } from 'react'
import "./_accordionGroup.scss"
import firebase from "firebase";

import { Accordion } from '../';
import Loading from '../../loading';

const AccordionGroup = ({ accordionData }) => {
    const firestoreDatabase = firebase.firestore();
    const [faq, setFaq] = useState(null);
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            try {
                firestoreDatabase.collection("Web-FAQ")
                    .get()
                    .then((querySnapshot) => {
                        if (querySnapshot) {
                            let faqData = [];
                            querySnapshot.forEach((doc) => {
                                faqData.push(doc.data());
                            })
                            setFaq(faqData);
                        }
                    })
            } catch (error) {
                console.log("Error while fetching FAQ");
            }
        }
        return () => {
            isMounted = false
        }
    }, [])

    return (
        <div className="accordionGroup">
            <h3 className="accordionGroup-head">Any Questions??</h3>
            {faq ?
                <div>
                    {
                        faq.map((data, index) => {
                            return <div key={index}>
                                <Accordion accordion={data}/>
                            </div>
                        })
                    }
                </div>
                :

                <div className="accordion-loading-wrapper">
                <Loading />
                </div>
            }
        </div>
    )
}

export default AccordionGroup
