import React from 'react'
import SEO from '../../components/global/SEO'
import './_aboutUs.scss'
const AboutUs = () => {
    return (
        <div className="aboutUs-container">
          
             <SEO title='MedicosPDF About us page' description='The journey of medicos pdf tells the story of colaboration of medical and IT field....'/>
            <div className="aboutUs-container-wrapper">
                <div className="aboutUs-container-wrapper-main">
                     <h2 className='aboutus-h2'>About Us:</h2>
                     <div>
                         <h3 className='aboutus-h3'>Our Story</h3>
                         <p>
                         This Medicos International was actually formed from the combined ideas of some MBBS students and some Software Engineer. Since 2017 A.D Medicos International has built a team of talented hardworking MBBS Medicos, Software Engineer professionals, designers, each delivering their 100 % to give best service to medical students as well as to medical professionals. With the dream and desire to bring change in the medical field through technology, we are trying to introduce best medical apps with insightful features to provide quality, free medical education to world- wide.
                         <br/>
                         We are dreamers, thinkers and doers rolled into one .Together, we want to improve the healthcare experience for all humanity. We are guided by our values and driven by our motto to do great. These are not just principles for our products or our company, but they are a reflection of who we are as people.
                         <br/>
                         We always stand at the forefront of all emerging trends and needs in medical field. We deliver best medical apps understanding the real problem, obligations of medical field. Our main strategy is to make medical study easier, sleek, rational and smarter.
                         </p>
                     </div>
                     <div>
                         <h3 className='aboutus-h3'>Our Product and Services:</h3>
                         <ul className='aboutus-ul'>
                             <li><a>Medicos Pdf:</a> Provides thousands of medical books, slides, articles, news, journals in one app.</li>
                             <li><a>Medicos Medicine:</a> Useful for quick reference to bedside history taking and clinical examinations.</li>
                             <li><a>Medicos ECG: </a>Easy guide for ECG/EKG interpretation and practice with more than 100 real cases.</li>
                             <li><a>Medicos Pediatric:</a> Best app for bedside pediatric ward posting useful for students, doctors and nurses.</li>
                             <li><a>Medicos Histology: </a>Contains notes and handmade diagrams for anatomy histology covering all topics.</li>
                             <li><a>Medicos Radiology: </a>It includes from basic to covering every cases on each system, audio-video contents, case based learning, real case base learning, CXR MCQ.</li>
                            <li><a>Medicos Abbreviation: </a>This is offline abbreviation system which lets user to discover medical short form and terms found in health records or medical documentation, medical prescriptions, descriptions of health conditions, treatments, diseases or surgeries in daily life.</li>
                            <li><a>Medicos Dental Material:</a> Easy approach for dental students of dental instrument/material.</li>
                            <li><a>Medicos Surgery: </a>Useful for users wanting quick reference to contents while they are in bedside classes taking history and performing clinical examination of surgery.</li>
                           
                         </ul>
                     </div>
                     <div>
                         <h3 className='aboutus-h3'>User Experience</h3>
                         <p>We make our users experience smarter using modern technology. We believe in understanding the real need of the users and augmentation of standard and satisfied features.
                             <br/>
                             We believe in “The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.”
                         </p>
                     </div>
                </div>
            </div>
            
        </div>
    )
}

export default AboutUs
