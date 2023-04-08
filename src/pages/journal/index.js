import axios from 'axios';
import firebase from "firebase";
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

//LOCAL IMPORTS
import SEO from '../../components/global/SEO';
import Loading from '../../components/loading';
import { logEventWithoutParams } from '../../functions/commonMethod';
import { MixSection } from './component/mixsection';
import { OutPost } from './component/outpost';
import { JournalRecent } from './component/recent';
import SelectedJournal from './component/selectedJournal';
import './_journal.scss';

const variants = {
  exit: {
    x: '-100vw',
    opacity: 0,
    transition: {
      ease: 'easeIn',
      x: '-100vw',
      delay: .2,
    }
  }
}
   const Journal = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const [allJournals, setAllJournals] = useState([]);
  const [journalData1, setJournalData1] = useState(null);
  const [journalData2, setJournalData2] = useState(null);
  const [journalData3, setJournalData3] = useState(null);
  const [journalData4, setJournalData4] = useState(null);
  const [journalData5, setJournalData5] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      logEventWithoutParams("web_journal_page_visited")
    }
    return (() => {
      isMounted = false;
    })
  }, [])

  useEffect(async () => {
    let isActive = true;
    async function addJournal(source, docId) {
      await axios.get(source,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            "Access-Control-Allow-Origin": "*"
            // 'Referrer': 'origin'
          }
        }).then((response) => {
          if (response?.data) {
            // alert ("No data on firebase")
            // ADD JOURNAL OF RESPECTIVE SOURCE
            // ADD EXPIRATION DATE FOR JOURNAL
            let expiry_date = new Date();
            expiry_date.setDate(expiry_date.getDate() + parseInt(1))
            firebase.firestore().collection('Web-Journals')
              .doc("expiry")
              .set({
                expiry_date: expiry_date.toISOString()
              })
              .then(() => {
                response.data?.items?.map((data) => {
                  // console.log("Journal title", data?.title)
                  firebase.firestore().collection('Web-Journals')
                    .doc(docId)
                    .collection('Journals')
                    .doc(data?.title.replace(/\/|\[|\]/g, ''))
                    .set({
                      data: data,
                      date: data?.isoDate
                    })
                })
               if(isActive){
                setAllJournals((init) => [...init, response?.data?.items]);
               }
              })
            // return response.data?.items;
          }
        }).catch((err) => {
          console.log("Error fetching journal from link", err);
        })
    }
    async function fetchJournal(source, docId) {
      try {
      
        await firebase.firestore().collection('Web-Journals')
          .doc(docId)
          .collection('Journals')
          .orderBy('date', 'desc')
          .limit(100)
          .onSnapshot(async (querySnapshot) => {
            // console.log("JOURNAL DATA DOC", querySnapshot);

            //CHECKS IF WEB JOURNAL COLLECTION EXISTS OF RESPECTIVE SOURCES
            if (!querySnapshot.empty) {
        
              return await firebase.firestore().collection('Web-Journals')
                .doc("expiry")
                .get()
                .then((res) => {
                  //CHECKS EXPIRY DATE OF JOURNAL TO UPDATE JOURNAL DATA 
                  if (res.data().expiry_date < new Date().toISOString()) {
                
                    addJournal(source, docId)
                  } else {
                    //FETCHING JOURNAL FROM FIREBASE
                    let fetchedData = [];
                    querySnapshot.forEach((doc) => {
                      fetchedData.push(doc.data().data)
                    })
              
                    if(isActive){
                      setAllJournals((init) => [...init, fetchedData]);
                    }
                  }
                })
            } else {
         
              addJournal(source, docId)
            }
          })

      } catch (error) {
        console.log("Error fetching journal from firebase", error);
      }
    }
    if (isActive) {
      await fetchJournal('https://medicospdf.com/api/journals?link=https://www.thelancet.com/rssfeed/lancet_current.xml', 'lancet_current')
      await fetchJournal('https://medicospdf.com/api/journals?link=https://www.thelancet.com/rssfeed/lancet_online.xml', 'lancet_online');
      await fetchJournal('https://medicospdf.com/api/journals?link=https://pmj.bmj.com/rss/current.xml', 'pmj_bmj_com');
      await fetchJournal('https://medicospdf.com/api/journals?link=https://www.amjmed.com/current.rss', 'amjmed');
      await fetchJournal('https://medicospdf.com/api/journals?link=https://www.tandfonline.com/feed/rss/iorb20', 'tandfonline')
    }
    return () => {
      isActive = false;
    };

  }, [])
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      allJournals.map((journal, index) => {
        if (index == 0 && isMounted) {
          setJournalData1(journal)
        } else if (index == 1 && isMounted) {
          setJournalData2(journal)
        } else if (index == 2 && isMounted) {
          setJournalData3(journal)
        } else if (index == 3 && isMounted) {
          setJournalData4(journal)
        } else if (index == 4 && isMounted) {
          setJournalData5(journal)
        }
      })
    }
  }, [allJournals?.length])


  return (
    <motion.div
      variants={variants}
      exit='exit'
      className="journal-wrapper">
      <SEO title='MedicosPDF Journal page' description='MedicosPDF journal page provides provides latest medical journals for medical students to enhance their knowledge and skill' />
      <div className="progressBarContainer">
        <div className="progressBarContainer-increment" style={{ width: `${scrollTop}%` }}></div>
      </div>

      {journalData5 ?
        <SelectedJournal details={journalData5} />
        :
        <div className="journal-loading-wrapper">
          <Loading />
        </div>
      }

      {journalData4 ?
        <JournalRecent recent={journalData4} />
        :
        <div className="journal-loading-wrapper">
          <Loading />
        </div>
      }

      {journalData3 ?
        <OutPost outPost={journalData3} />
        :
        <div className="journal-loading-wrapper">
          <Loading />
        </div>
      }

      {journalData1 && journalData2 ?
        <MixSection mostVisited={journalData2} journalData={journalData1} />
        :
        <div className="journal-loading-wrapper">
          <Loading />
        </div>
      }

    </motion.div>
  )
}

export default Journal