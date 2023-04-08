// import React, { useState,useEffect } from 'react'
// import { Headings } from '../../../components/global/headings';
// import './_explore.scss'


// const ExploreTab = ({links}) => {

//     const [activeTab, setActiveTab] = useState(0);
//     useEffect(() => {
//          activeData([...links.filter((data,index)=>index==activeTab)]);
//     }, [activeTab])
   
//     return (
//         <nav className="profileexploreLink">
//              <div className={`profileexploreLinkTab move${activeTab}`}> 

//             {links.map((link, index) => (

//                  <div key={index} className="profileexploreLinkTab-container">
//                     {index == activeTab ?
//                         <div className="profileexploreLinkTab-container-link-active" onClick={() => setActiveTab(index)}>
            
//                             <Headings
//                                 className="tabText"
//                                 type="heading6"
//                                 href={link.url}
//                                 key={link.id}
//                                 content={link.linkName}
//                             />
                         
                            
//                         </div>                      
//                         :
//                         <div className="profileexploreLinkTab-container-link " onClick={() => setActiveTab(index)}>
//                             <Headings
//                                 className="tabText"
//                                 type="heading6"
//                                 href={link.url}
//                                 key={link.id}
//                                 content={link.linkName}
//                             />
                           
                          
//                         </div>
//                     }
                      
//                 </div>

//             ))}
          
//           </div>
//           <div className="underline-active"></div>
           
//         </nav>
//     )
// }

// export default ExploreTab
