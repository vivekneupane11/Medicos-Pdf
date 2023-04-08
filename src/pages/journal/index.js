import axios from 'axios';
// import firebase from "firebase/compat/app";

import React, { useEffect, useState } from 'react';
import ScrollToTopButton from '../../components/global/scrollToTopButton';

//LOCAL IMPORTS
import img from '../../assets/images/bookbackg.webp'
import SEO from '../../components/global/SEO';
import Loading from '../../components/loading';
import { logEventWithoutParams } from '../../functions/commonMethod';
import { MixSection } from './component/mixsection';
import { OutPost } from './component/outpost';
import { JournalRecent } from './component/recent';
import SelectedJournal from './component/selectedJournal';
import './_journal.scss';
import { SelectedPlaceholder } from './component/selectedJournalPlaceholder';
import { RecentJournalPlaceholder } from './component/recentPlaceholder';
// import { collection, doc, getDoc, getFirestore, limit, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';

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
  // const [scrollTop, setScrollTop] = useState(0);
  const scrollTop = 0;
  const [allJournals, setAllJournals] = useState([]);
  const [journalData1, setJournalData1] = useState(null);
  const [journalData2, setJournalData2] = useState(null);
  const [journalData3, setJournalData3] = useState(null);
  const [journalData4, setJournalData4] = useState(null);
  const [journalData5, setJournalData5] = useState(null);
  // const db =getFirestore();
  const getFirebaseAll=()=>{
    return Promise.all([
      import('../../firebase/firestore')
    ])
    .then(([firestore])=>{
      return {firestore}
    })
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      logEventWithoutParams("web_journal_page_visited")
    }
    return (() => {
      isMounted = false;
    })
  }, [])

  useEffect(() => {
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
        }).then(async(response) => {
         try {
           const {firestore:{db,setDoc,doc}}=await getFirebaseAll()
           if (response?.data) {
            // alert ("No data on firebase")
            // ADD JOURNAL OF RESPECTIVE SOURCE
            // ADD EXPIRATION DATE FOR JOURNAL
            let expiry_date = new Date();
            expiry_date.setDate(expiry_date.getDate() + parseInt(1))

            const expRef=setDoc(doc(db,"Web-Journals","expiry"),{
              expiry_date: expiry_date.toISOString()
            })
          
              .then(() => {
                response?.data?.items?.map((data) => {
                    setDoc(doc(db,"Web-Journals",docId,"Journals",data?.title.replace(/\/|\[|\]/g, ''),{
                      data: data,
                      date: data?.isoDate,
                      sourceDocId: docId
                    }))
                    setDoc(doc(db,"Web-SearchByTag",(data?.title?.replace(/\/|\[|\]/g, '') + data?.content?.replace(/\/|\[|\]/g, '')).slice(0, 1450),
                    {
                      title: data?.title?.replace(/\/|\[|\]/g, ''),
                      type: 'journal',
                      sourceDocId: docId
                    }))
                })
                if (isActive) {
                  setAllJournals((init) => [...init, response?.data?.items]);
                }
              })
            // return response.data?.items;
          }
         } catch (error) {
           
         }
        }).catch((err) => {
          console.log("Error fetching journal from link", err);
        })
    }
    async function fetchJournal(source, docId) {
      try {
        const {firestore:{db,query,collection,orderBy,limit,onSnapshot,getDoc,doc}}=await getFirebaseAll()
         const colRef=query(collection(db,"Web-Journals",docId,'Journals'),
         orderBy('date', 'desc'),
         limit(100))
         await onSnapshot(colRef,async (querySnapshot) => {
            // console.log("JOURNAL DATA DOC", querySnapshot);

            //CHECKS IF WEB JOURNAL COLLECTION EXISTS OF RESPECTIVE SOURCES
            if (!querySnapshot.empty) {

              return await
              getDoc(doc(db,"Web-Journals","expiry"))
            
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

                    if (isActive) {
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
       fetchJournal('https://medicospdf.com/api/journals?link=https://www.thelancet.com/rssfeed/lancet_current.xml', 'lancet_current')
       fetchJournal('https://medicospdf.com/api/journals?link=https://www.thelancet.com/rssfeed/lancet_online.xml', 'lancet_online');
       fetchJournal('https://medicospdf.com/api/journals?link=https://pmj.bmj.com/rss/current.xml', 'pmj_bmj_com');
       fetchJournal('https://medicospdf.com/api/journals?link=https://www.amjmed.com/current.rss', 'amjmed');
       fetchJournal('https://medicospdf.com/api/journals?link=https://www.tandfonline.com/feed/rss/iorb20', 'tandfonline')
    }
    return () => {
      isActive = false;
    };

  }, [])


  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      allJournals.map((journal, index) => {
        if (index === 0 && isMounted) {
          setJournalData1(journal)
        } else if (index === 1 && isMounted) {
          setJournalData2(journal)
        } else if (index === 2 && isMounted) {
          setJournalData3(journal)
        } else if (index === 3 && isMounted) {
          setJournalData4(journal)
        } else if (index === 4 && isMounted) {
          setJournalData5(journal)
        }
      })
      console.log('journal page check')
    }
  }, [allJournals?.length,allJournals])


  return (
    <div


      className="journal-wrapper">
        <SEO title='Medicos Pdf Journals contains all medical research , journals ,recent medical study and experiments for you. Get medical journals from various sources at one place..' description='This is the journal page of MedicosPdf' />
        <ScrollToTopButton/>
      <div className="progressBarContainer">
        <div className="progressBarContainer-increment" style={{ width: `${scrollTop}%` }}></div>
      </div>

      {journalData5 ?
        <SelectedJournal details={journalData5} />
        :
       <SelectedPlaceholder/>
      }

      {journalData4 ?
        <JournalRecent recent={journalData4} />
        :
        <RecentJournalPlaceholder/>
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

    </div>
  )
}

export default React.memo(Journal)