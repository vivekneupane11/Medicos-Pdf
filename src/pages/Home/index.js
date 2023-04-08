import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import img from '../../assets/images/bookbackg.webp';
//Local imports
import SEO from '../../components/global/SEO';
import { logEventWithoutParams } from '../../functions/commonMethod';
import ButtonWithArrow from "./components/buttonWithArrow";
import "./index.scss";
import Loadable from 'react-loadable';

// import ArrowLeft from '../../components/global/icons/arrowleft';


const ScrollToTopButton = Loadable({
  loader: () => import('../../components/global/scrollToTopButton'),
  loading() {
    return <div style={{ color: 'gray' }}></div>
  }
});


const Welcome = Loadable({
  loader: () => import('./components/welcome'),
  loading() {
    return <div style={{ color: 'gray' }}></div>
  }
});

const LoadableLoginModal = Loadable({
  loader: () => import('../../components/global/loginModel').then(module => module.LoginModal),
  loading() {
    return <div style={{ color: 'gray',height:'60vh',width:'100%',backgroundColor:'gray' }}></div>
  }
});
const LoadableSignInPopUpForMobile = Loadable({
  loader: () => import('../../components/global/signInPopUpForMobile'),
  loading() {
    return <div style={{ color: 'gray' }}></div>
  }
});

const LoadableSlideTrending = Loadable({
  loader: () => import('../Slide/component/slideTrending'),
  loading() {
    return <div style={{ color: 'gray' }}></div>
  }
});
const LoadableBookTrending = Loadable({
  loader: () => import('../Book/components/bookTrending'),
  loading() {
    return <div style={{ color: 'gray' }}></div>
  }
});



const Home = () => {
  // const [books, setBooks] = useState([])
  // const [loadingSlides, setLoadingSlides] = useState(false)
  // const [loadingBooks, setLoadingBooks] = useState(false)
  const [showFormModel, setShowFormModel] = useState(false)


  const homeeStructuredData = {
    "@context": "https://schema.org/",
    "@type": "Medicos PDF",
    headline: "Get millions of free Medical Books , Medical Slides , Medical Notes , Articles , News , journals and many more...",
    description: `Second Medical College, Online Medical College, Medical Space, Space for 
        the medical students, where medical students hangouts, Medical Student `,
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/JSON-LD.svg",
    datePublished: new Date("2021-09-04T09:25:01.340Z").toISOString(),
    author: {
      "@type": "Person",
      name: "Medicos International",
      url: "https://medicospdf.com",
    },
  };
  // USED FOR ANALYTICS
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      logEventWithoutParams('web_home_page_visited')
    }
    return () => {
      isMounted = false
    }
  }, [])


  const FormModel = (dontShow) => {

    if (dontShow === false) {
      setShowFormModel(false)

    }
  }

  const callBackFromSignInPopUpForMobile = (show) => {
    if (show === true) {
      setShowFormModel(true)
    }
  }


  return (
    <div className="home-page-container">
      <script type="application/ld+json">
        {JSON.stringify(homeeStructuredData)}
      </script>

      <SEO image={img} title='MedicosPDF' description='Second Medical College, Online Medical College, Medical Space, Space for 
the medical students, where medical students hangouts, Medical Student 
Space, Medical slides, Medical PowerPoint, Medical pdf, Medical ppt, 
Medical Online library, Top Medical News, Top Medical Journals, Top 
Medical Slides, 
Slides
general medicine pdf
general medicine pdf
basics of medicine pdf
medical books online
introduction to medicine pdf
clinical medicine pdf
practice of medicine pdf
basics of medicine pdf
clinical medicine pdf
practice of medicine pdf
medical books online
jaypee medical books pdf free download
introduction to medicine pdf
mbbs books pdf google drive
medical slide templates,
medical templates free download,
medical template,
medical powerpoint template free download,
health care ppt slides,
animated medical powerpoint templates free download,
covid 19 powerpoint presentation template free,
medical google slides template,
medical slide templates,
medical template,
medical templates free download,
health care ppt slides,
medical presentation examples,
medical PowerPoint template free download,
medical ppt template
medical ppt blogspot
medical ppt presentation free download
medical ppt background free download
medical ppt lectures
medical ppt test
medical ppt icons
emergency medical ppt
free medical ppt templates
x ray medical ppt
thank you slide for medical ppt
best medical ppt templates free download
cute medical ppt template
case presentation medical ppt
what is a medical ppt test
ethics medical ppt
medical ethics ppt
medical termination of pregnancy ppt
medical terminology ppt
medical negligence ppt
medical gas pipeline system in hospitals ppt
medical entomology ppt
medical emergencies ppt
medical emergencies in dental practice ppt
medical surgical nursing lecture notes ppt
medical waste management ppt 
top medical slides in nepal
top medical slides india
Books 
nursing books, books for surgery and doctors. Basic Science (Anatomy, 
Biochemistry, Community Medicine, Embryology, Genetic, Microbiology, 
Pathology, Pharmacology, Physiology). Clinical science (Anesthesia, 
Cardiology, Community Medicine, Endocrinology, Gastroenterology, 
Genetic, Neurology, Neurology, Nephrology, Oncology, Pediatric, 
Pulmonology, radiology, Rheumatology.) Dental (Dental materials, oral 
medicine/ radiology, pediatric dentistry, periodontology, prosthodontics, 
public health dentistry, Forensic dentistry, oral and maxillofacial surgery, 
oral pathology, prosthodontics etc.) Nursing (Gerontological nursing, 
medical surgical nursing, fundamental of nursing, nutrition, psychiatric 
nursing, nursing pharmacology, pathology and genetics and so on). 
Physiotherapy (Biomechanics and Kinesiology, Physiotherapy in sports 
injuries, physiotherapy in orthopedic conditions etc.)
medical pdf
medical pdf books
medical pdf notes
medium medical pdf
dgca class 1 medical pdf
aakash study package solutions medical pdf
case sheet format medical pdf
terminology medical pdf
career paths medical pdf
abbreviation medical pdf
free medical pdf books
mnemonics medical pdf
power of attorney medical pdf
medical fitness certificate pdf
medical terminology pdf
medical abbreviations pdf
medical certificate pdf
medical books pdf
medical certificate format pdf
medical reimbursement form pdf
medical dictionary pdf
medical form pdf
medical terminology list pdf
most expensive medical books
best medical books 2021
best medical books for students
best medical books for beginners
best books for medical students uk
best medical books 2020
doctor books for students
books about medicine and its contribution
top medical books to read
top medical books for students
top medical books 2020
top medical books apps
top medical books in india
top 10 medical books
top 10 anatomy books for medical students
top medical thriller books
top rated medical books
top 10 medical books to read
top selling medical books
top 10 medical books free download
top 10 best medical books
top 10 medical books pdf
top 10 medical books apps for android
best medical books for students
most expensive medical books
best medical books for beginners
best medical books 2020
best medical books 2021
doctor books for students
general medicine pdf
basics of medicine pdf
medical books online
introduction to medicine pdf
clinical medicine pdf
practice of medicine pdf
medical books online free
medical books online pdf
medical books free
medical books online library
anatomy medical books
oxford medicine online
medical books for beginners
free online medical library for students
medical books online
medical books online pakistan
medical books online library
medical books online free
medical books online.net
medical books online pdf
medical books online free download
medical books online bd
medical books online lahore
medical books online malaysia
buy medical books online
free medical books online
second hand medical books online
paras medical books online
free medical books online pdf
download medical books online
sell medical books online
sell used medical books online india
buy medical books online pakistan
medical coding books online free
medical assistant books online free
medical coding books online
medical second hand books online
medical reference books online
medical terminology books online
medical e books online
medical books online
medical books online Pakistan
medical books online library
medical books online free
medical books online 
medical books online pdf
medical books online free download
medical books online bd
medical books online lahore
medical books online malaysia
buy medical books online
free medical books online
second hand medical books online
paras medical books online
free medical books online pdf
download medical books online
sell medical books online
sell used medical books online India
buy medical books online Pakistan
medical coding books online free
medical assistant books online free
medical coding books online
medical second hand books online
medical reference books online
medical terminology books online
medical e books online
News:
world health news today
health news india
health articles 2020
health articles 2021 for students
health articles 2021
health news uk
health current events not covid related
cnn health news
top medical news
top medical news today
top medical news websites
top medical news sites
top medical news app
us news top medical schools
us news top medical schools research
us news and world report top academic medical centers
medical news today top 10 causes of death
top medical device news
top medical newsletters
top medical newspapers
topcon medical news
top 10 medical news
hot medical topics in the news
medical topics in the news
current medical topics in the news
Journals
free medical journals
free medical journals for students pdf
free medical journals for publication
free medical journals for students
free medical journals in india
free medical journals for developing countries
free medical journals to publish
free medical journals list
free medical journals pdf
free medical journals for publication in india
gfmer free medical journals
best free medical journals
case report ophthalmology free medical journals
pubmed indexed free medical journals
radiology medical imaging free medical journals
scopus indexed free medical journals
cardiology free medical journals
apc free medical journals
free pubmed indexed medical journals
free online medical journals
free to publish medical journals
free access to medical journals
free scopus indexed medical journals
free apc medical journals
free peer reviewed medical journals
free indian medical journals
free publication fee medical journals
free international medical journals for publication
free medical journals for students pdf
free pubmed indexed medical journals
top 10 medical journals
gfmer free medical journals
medical journals online
international medical journals
free medical journals for students pdf
free pubmed indexed medical journals
top 10 medical journals
medical journals online
indian medical journals
international medical journals
gfmer free medical journals
list of medical journals
the new england journal of medicine
top 10 medical journals uk
best medical journals for students
british medical journal
top medical journals impact factor
the american journal of medicine
the new england journal of medicine
top 10 medical journals uk
best medical journals for students
british medical journal
top medical journals impact factor
the american journal of medicine
top 10 medical journals uk
british medical journal
journal of internal medicine
top medical journals impact factor
best medical journals for students
free medical journals
medical journal impact factor
top medical journals impact factor
top medical journals in the world
top medical journals ranking
top medical journals in india
top medical journals in us
top medical journals uk
top medical journals in pakistan
top medical journals australia
top medical journals in africa
list of top medical journals
handling missing data in rcts a review of the top medical journals
worlds top medical journals
                impact factors of top medical journals
                top 10 medical journals
            top 10 medical journals in india
            top 10 medical journals in the world
            top peer reviewed medical journals
            top 5 medical journals
            top rated medical journals
            top 10 medical journals uk
            top ten medical journals
            top tier medical journals
            top ranked medical journals
            top medical journals in the world
            top 10 medical journals in the world
            top medical journals impact factor
            new england journal of medicine
            medical journal impact factor
            top 10 medical journals uk
            top 10 medical journals in the world
            new england journal of medicine
            top medical journals in the world
            top medical journals impact factor
            medical journal impact factor
            top 10 medical journals uk
            medicine journal impact factor 2020
            british medical journal
            Article
            doctor tips bangla
            doctors tips for getting pregnant
            doctors tips for weight loss
            doctors tips for good health
            doctors tips for hair growth
            doctors tips for covid
            doctors tips for normal delivery
            doctor tips telugu
            doctor healthy tips
            karu muttai valara doctors tips in tamil
            uyaramaga valara doctors tips
            uyaramaga valara doctors tips in tamil
            coronavirus doctor tips
            dating doctors tips
            shadowing doctors tips
            doctors online health care tips
            doctors health tips
            doctors receptionist interview tips
            doctor ayurvedic tips
            doctor tips for health
            basic things a doctor should know
            types of doctors
            how to become a great doctor
            skills of a doctor
            successful doctor stories
            doctor tips for health
            types of doctors
            basic things a doctor should know
            how to become a great doctor
            skills of a doctor
            doctors advice or advise
            attitude of a doctor
            describe a doctor
            medical tips by medical students in nepal
            medical tips by medical students pdf
            doctors advice to medical students
            study habits for medical students
            study tips for medical students pdf
            study plan for medical students
            best study tools for medical students
            how to be a successful medical student in nigeria
            doctors advice to medical students
            study habits for medical students
            study tips for medical students pdf
            study plan for medical students
            how to be a successful medical student in nigeria
            basic things a medical student should know
            memorization techniques for medical students
            best study tools for medical students
            healthy lifestyle tips
            healthy lifestyle tips for students
            healthy lifestyle tips for adults
            healthy lifestyle tips in hindi
            healthy lifestyle tips for office workers
            healthy lifestyle tips pdf
            healthy lifestyle tips for pcos
            healthy lifestyle tips in tamil
            healthy lifestyle tips in malayalam
            healthy lifestyle tips tagalog
            healthy lifestyle tips for diabetes
            healthy lifestyle tips for weight loss
            healthy lifestyle tips in marathi
            healthy lifestyle tips for college students
            healthy lifestyle tips and tricks
            10 tips for a healthy lifestyle
            simple health tips for everyday living
            healthy lifestyle examples
            healthy lifestyle guidelines includes
            health tips for covid-19
            100 health tips
            healthy lifestyle guidelines includes
            daily health tips
            100 health tips
            simple health tips for everyday living
            natural health tips
            10 tips for a healthy lifestyle
            healthy lifestyle examples
            how to become healthy
            healthy tips of the day
            healthy tips in hindi
            healthy tips for pregnancy
            healthy tips for skin
            healthy tips for hair
            healthy tips for hair growth
            healthy tips for eyes
            healthy tips for pregnancy first trimester
            healthy tips for weight gain
            eating healthy tips
            how to stay healthy tips
            heart healthy tips
            hair healthy tips
            eyes healthy tips
            teeth healthy tips
            10 healthy tips for a healthy lifestyle
            8 healthy tips for eating
            mind healthy tips
            skin healthy tips in hindi
            healthy hair tips
            healthy lifestyle tips
            healthy eating tips
            healthy skin tips
            healthy pregnancy tips
            healthy skin tips for face
            healthy heart tips
            healthy relationship tips
            healthy nails tips
            healthy beef tips recipe
            healthy tips for kids
            how to stay healthy tips
            simple health tips
            health tips for students
            health tip of the day
            healthy lifestyle
            how to stay healthy tips
            10 tips for a healthy lifestyle
            healthy lifestyle examples
            health tips for students
            simple health tips
            healthy tips for kids
            healthy lifestyle
            medical student blog malaysia
            medical student blog names
            medical student blog india
            medical student blog uk
            medical student blog ideas
            medical student blog australia
            medical student blog philippines
            medical student blog funny
            medical student blog sites
            life of a medical student blog
            non traditional medical student blog
            singapore medical student blog
            first year medical student blog
            first year medical student blog philippines
            caribbean medical student blog
            australian medical student blog
            um medical student blog
            indian medical student blog
            dundee medical student blog
            medical technology student blog
            medical genomics student blog
            medical student bloggers
            first year medical student blog
            medical student notes blog
            medical blog topics
            medical blogs
            medical school insiders review
            life of a medical student
            first year medical student blog
            medical blogs
            medical school insiders review
            medical student notes blog
            medical blog topics
            med school insiders
            life as a medical student uk
            medical care blog
            twelve tips for the integration of medical students into telemedicine
            visits
            twelve tips for interfacing with the new generation of medical students
            igen
            study habits for medical students
            study tips for medical students pdf
            12 types of medical students
            doctors advice to medical students
            study plan for medical students
            how to be a successful medical student
            study habits for medical students
            study tips for medical students pdf
            12 types of medical students
            basic things a medical student should know
            doctors advice to medical students
            study plan for medical students
            how to be a successful medical student
            memorization techniques for medical students
            medical tips in tamil
            medical tips procedure
            medical tips bangla
            medical tips in urdu
            medical tips and tricks
            medical tips in bengali
            medical tips in hindi
            medical tips malayalam
            medical tips twitter
            tib-e-nabvi medical tips in urdu
            esa medical tips
            dragon medical tips and tricks
            cook medical tips set
            daily medical tips
            survival medical tips
            emergency medical tips
            fsc pre medical tips
            basic medical tips
            army medical tips
            medical school interview tips
            medical q tips
            medical billing tips and tricks
            medical coding tips
            medical school study tips
            medical coding tips and tricks for beginners
            medical assistant tips and tricks
            medical school tips
            medical assistant tips
            medical interview tips
            top medical article in nepal
            top medical articles 2020
            top medical articles
            top medical research articles
            top medical journal articles
            trending medical articles
            medical articles topics
            article topics for medical students
            medical research article topics
            topics for article writing for medical students
            new england journal of medicine
            medical articles on diseases
            top 10 medical journals uk
            articles for medical students
            medical journal articles
            interesting medical articles
            new england journal of medicine
            medical articles on diseases
            top 10 medical journals uk
            articles for medical students
            interesting medical articles
            medical articles pdf
            medical journal articles
            medical news articles
            mental health tips
            simple health tips
            health tips for kids
            health tips in english
            health tip of the week
            10 tips for good health
            mental health tips
            simple health tips
            health tips for kids
            health tips in english
            health tip of the week
10 tips for good health' />
      <LoadableSignInPopUpForMobile callBack={callBackFromSignInPopUpForMobile} />
      <LoadableLoginModal show={showFormModel} formModel={FormModel} />
      <ScrollToTopButton />
      <LazyLoad height={200} offset={100}>
      <Welcome />
      </LazyLoad>

      <div>
        <LazyLoad height={200} offset={100}>
          <LoadableBookTrending />
        </LazyLoad>
        <div>
          <ButtonWithArrow name="View more Books" link='/book' />
        </div>
      </div>
      <div>
        <LazyLoad height={200} offset={100}>
          <LoadableSlideTrending />
        </LazyLoad>
        <div>
         
         
          <ButtonWithArrow name="View more Slides" link='/slide' />
        </div>
      </div>








    </div>
  )
}

export default Home
