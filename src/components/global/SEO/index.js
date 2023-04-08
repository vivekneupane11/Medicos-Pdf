import React, { useState } from 'react'
import {Helmet} from "react-helmet";
import { useLocation } from 'react-router';
const SEO = ({title, description,keywords,image}) => {

    const location=useLocation()
    const [url,setUrl]=useState(location?.pathname)
    
    return (
        <Helmet>
            <meta name="title" content={title}/>
            <meta name="description" content={description} data-react-helmet="true" />

            {/* <!-- Open Graph / Facebook --> */}
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={url}/>
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:image" content={image}/>

            {/* <!-- Twitter --> */}
            <meta property="twitter:card" content={title}/>
            <meta property="twitter:url" content={url}/>
            <meta property="twitter:title" content={title}/>
            <meta property="twitter:description" content={description}/>
            <meta property="twitter:image" content={image}></meta>
            <title>{title}</title>
            
        </Helmet>
    )
}

export default SEO
