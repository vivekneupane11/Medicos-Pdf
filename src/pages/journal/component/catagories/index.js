import React from 'react'
import NewsLinkTag from '../../../../components/global/newsLinkTag'
import './_catagories.scss'
import { motion } from 'framer-motion';
import MappedDataAnimation from '../../../customAnimation/mappedDataAnimation'
import shortid from  "shortid";
const  JournalCategories = ({details}) => {
    const headAnimation1=MappedDataAnimation(.1);
    return (
        <>
          <div className="journalCategories-wrapper">
          <h3 className="journalCategories-wrapper-heading"> Categories</h3>
              <div ref={headAnimation1.ref} className="journalCategories-wrapper-imgContainer">
                  {details.map(data=>(
                   
                        <motion.div custom={data.id} animate={headAnimation1.animation} key={shortid.generate()} className="journalCategories-wrapper-imgContainer-bgImg" style={{backgroundImage:`url(${data.bgImg})`}} >
                           
                                <div className="journalCategories-wrapper-imgContainer-bgImg-mid">
                                    <NewsLinkTag color={data.tag.color} tag={data.tag.tag} link={data.tag.link} />
                                    <div className="journalCategories-wrapper-imgContainer-bgImg-mid-postNo">{data.postsNo}</div>
                                </div>
                               <div className="overlay" style={{backgroundColor:`${data.tag.color}`}}></div>
                         
                          
                       </motion.div>  
                  ))}
              </div>
          </div>
            
        </>
    )
}

export default JournalCategories
