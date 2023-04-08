import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

const Intro = () => {

    const image={
        image1:require('../images/info.png').default ,
    }

    const[datas]=useState([
        {
          id:'1',
          headingOne:'For Developers',
          para:'The time is now for it to be okay to be great. People in this world shun people for being great. For being a bright color. For standing out. But the time is now.',
          h3:'Learn more',
        },
        {
            id:'2',
            headingOne:'For Designers',
            para:'There’s nothing I really wanted to do in life that I wasn’t able to get good at. That’s my skill. I’m not really specifically talented at anything except for the ability to learn.',
            h3:'Learn more'
        },
        {
            id:'3',
            headingOne:'For Beginners',
            para:'That’s what I do. That’s what I’m here for. Don’t be afraid to be wrong because you can’t learn anything from a compliment. If everything I did failed - which it doesn"t.',
            h3:'Learn more',
        },
    ])
    return (
        <div className="intro-wrapper"> 
            <div className="intro-wrapper-left">
               
               {datas.map(data=>(
                    <div key={data.id} className="intro-wrapper-left-item">
                    <div className="intro-wrapper-left-item-icon">
                        <FontAwesomeIcon icon={faBell}/>
                    </div>
                    <div className="intro-wrapper-left-item-desc">
                        <h1>{data.headingOne}</h1>
                        <p>{data.para}</p>
                        <h3>{data.h3}</h3>
                    </div>
                </div>

               ))}
      
            </div>

            <div className="intro-wrapper-right">
               <img src={image.image1} alt="info-sec-pic" />
            </div>
           
        </div>
    )
}

export default Intro
