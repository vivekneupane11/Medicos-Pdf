import React,{useState}from 'react'

const Blog = () => {

    const [topText]=useState({
        h1:'Our recent writings',
        p:'I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their perception of themselves! They"re slowed down by their perception of themselves. If you"re taught you can’t do anything, you won"t do anything.I was taught I could do everything.',
    })

    const [blog]=useState([
        {
            id:'1',
            h3:'AI at the Edge',
            h1:'Research Byte',
        },
        {
            id:'2',
            h3:'Spectrum',
            h1:'Data Visualization',
        },
        {
            id:'3',
            h3:'Touch on a Trend',
            h1:'New Challenges',
        },
        {
            id:'4',
            h3:'Self-Driving Cars',
            h1:'DriverLess Future',
        },
    ])

    return (
        <div className="blog-container">
           <div className="blog-container-rowTop">
                <h1>{topText.h1}</h1>
                <p>{topText.p}</p>
           </div>

           <div className="blog-container-rowBottom">

               {blog.map(data=>(
                    <div key={data.id}className="blog-container-rowBottom-item1">
                        <div className="blog-container-rowBottom-item1-text">
                            <h3>{data.h3}</h3>
                            <h1>{data.h1}</h1>
                        </div>
                  
                   </div>

               ))}

           </div>
        </div>
    )
}

export default Blog
