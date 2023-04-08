import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faCog } from '@fortawesome/free-solid-svg-icons'

const Analytics = () => {

    const [topInfo] = useState({
        p: 'INSIGHT',
        h1: 'Full-Funnel Social Analytics',
        h3: 'The time is now for it to be okay to be great.For being a bright color. For standing out.',
    })
    const [datas] = useState([
        {
            id: '1',
            h1: 'SOCIAL CONVERSATIONS',
            p: 'We get insulted by others, lose trust for those others. We get back stabbed by friends. It becomes harder for us to give others a hand.',
            h2: 'More about us',
        },
        {
            id: '1',
            h1: 'ANALYZE PERFORMANCE',
            p: 'Don"t get your heart broken by people we love, even that we give them all we have. Then we lose family over time. As we live, our hearts turn colder.',
            h2: 'Learn about our products ',
        },
        {
            id: '1',
            h1: 'MEASURE CONVERSIONS',
            p: 'What else could rust the heart more over time? Blackgold. The time is now for it to be okay to be great. or being a bright color. For standing out.',
            h2: 'Check our documentation',
        },
    ])
    return (
        <div className="analytics-container">
            <div className="analytics-container-rowTop">
                <div className="analytics-container-rowTop-Para">
                    <p>{topInfo.p}</p>
                </div>
                <h1>{topInfo.h1}</h1>
                <h3>{topInfo.h3}</h3>
            </div>

            <div className="analytics-container-rowBottom">

                {
                    datas.map(data => (
                        <div key={data.id} className="analytics-container-rowBottom-container">
                            <div className="analytics-container-rowBottom-container-icon">
                                <FontAwesomeIcon icon={faCog} size="2x" />
                            </div>
                            <h1>{data.h1}</h1>
                            <p>{data.p}</p>
                            <div className="analytics-container-rowBottom-container-next">
                                <h2>{data.h2}</h2>
                                <FontAwesomeIcon icon={faChevronRight} className="arrow" />
                            </div>
                        </div>

                    ))
                }


            </div>
        </div>
    )
}

export default Analytics
