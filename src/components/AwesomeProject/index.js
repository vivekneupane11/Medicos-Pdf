import { faProductHunt } from '@fortawesome/free-brands-svg-icons'
import React from 'react'
import { AiFillSetting } from 'react-icons/ai'
import { Headings } from '../global/headings'
import { Paragraphs } from '../global/paragraphs'
import './_awesomeProject.scss';

export const AwesomeProject = ({awesomeProject}) => {
    return (
        <div className="awesomeProject-wrapper">
        <h2>Some of Our awesome Project</h2>
        <div className="awesomeProject">
         
        
                       
                {
                    awesomeProject.map((project) => {
                        return   <div className="awesomeProject-card " key={project}>
                        <div className="awesomeProject-card-top" >
                                    <div className="awesomeProject-card-top-col1">
                                        <div>
                                            {project.col1_icon}
                                        </div>
                                        <div>
                                            <Paragraphs type="lead-text" content={project.col1_tag}/>
                                        </div>

                                    </div>
                                    <div className="awesomeProject-card-top-col2">
                                        <AiFillSetting className="awesomeProject-card-top-col2-icon"/>

                                    </div>

                                 </div>
                                <div className="awesomeProject-card-main">
                                    <div className="awesomeProject-card-main-image">
                                        {project.mainImage}

                                    </div>
                                    <div className="awesomeProject-card-main-details">
                                        <Headings type="heading4" content={project.projectHeading}/>
                                        <Paragraphs type="lead-text-small" content={project.projectDetails}/>

                                    </div>
                                    <div className="awesomeProject-card-main-membersDetails">
                                    <Headings type="heading5" content="Members"/>

                                    <div className="awesomeProject-card-main-membersDetails-image">
                                    <img className="awesomeProject-card-main-membersDetails-image-one" src={project.image1} />
                                    <img className="awesomeProject-card-main-membersDetails-image-two" src={project.image2} />
                                    <img className="awesomeProject-card-main-membersDetails-image-three" src={project.image3} />
                                    </div>
                                    </div>


                                </div>
                            </div>
                    })
                }

            
        
            
        </div>
        </div>
    )
}
