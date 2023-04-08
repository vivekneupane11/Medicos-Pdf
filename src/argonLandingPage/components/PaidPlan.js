import React,{useState} from 'react'

const PaidPlan = () => {

    const [textInfo]=useState({
        h1:'Choose a plan for your next project',
        b1:'Cheaper',
        b2:'Expensive',
        p:'You have Free Unlimited Updates and Premium Support on each package. You also have 20days to request a refund.',
    })

    const [card]=useState([
        {
          id:'1',
          h2:'STANDARD',
          li1:'$25',
          li2:'per month',
          li3one:'20GB ',
          li3two:'File Storage ',
          li4one:'15',
          li4two:'Users',
          li5one:'false ',
          li5two:'Support',
          p:'Request a demo',

        },
        {
            id:'1',
            h2:'STANDARD',
            li1:'$25',
            li2:'per month',
            li3one:'20GB ',
            li3two:'File Storage ',
            li4one:'15',
            li4two:'Users',
            li5one:'false ',
            li5two:'Support',
            p:'Request a demo',
  
          },
    ])
    return (
        <div className="paidPlan">

           <div className="paidPlan-container">
                <div className="paidPlan-container-col1">
                    <h1>{textInfo.h1}</h1>
                    <div className="paidPlan-container-col1-button">
                        <button>{textInfo.b1}</button>
                        <button>{textInfo.b2}</button>
                    </div>
                    <p>{textInfo.p}</p>
                </div>

                <div className="paidPlan-container-col2">
                    {card.map(data=>(
                         <div  key={data.id} className="paidPlan-container-col2-items">
                            <h1>{data.h2}</h1>
                            <div className="paidPlan-container-col2-items-mid">
                                <ul className="paidPlan-container-col2-items-mid-1">
                                    <li className="paidPlan-container-col2-items-mid-1-1">{data.li1}</li>
                                    <li className="paidPlan-container-col2-items-mid-1-2">{data.li2}</li>
                                </ul>
                               
                               <ul className="paidPlan-container-col2-items-mid-2">
                                    <li className="paidPlan-container-col2-items-mid-2-1"><span>{data.li3one}</span>{data.li3two}</li>
                                    <li className="paidPlan-container-col2-items-mid-2-2"><span>{data.li4one} </span>{data.li4two}</li>
                                    <li className="paidPlan-container-col2-items-mid-2-3"><span>{data.li5one} </span>{data.li5two}</li>
                               </ul>
                               
                            </div>
                            <p>{data.p}</p>
                        </div>

                    ))}
    
                </div>
           </div>
        </div>
    )
}

export default PaidPlan
