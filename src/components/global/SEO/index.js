import React from 'react'
import {Helmet} from "react-helmet";

const SEO = ({title, description,keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="description" content={keywords} />
            
        </Helmet>
    )
}

export default SEO
