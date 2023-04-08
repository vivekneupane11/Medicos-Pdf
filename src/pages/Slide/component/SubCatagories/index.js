import React, { useEffect, useState } from 'react'
import CircleIcon from '../../../../components/global/icons/circle'
import './_subcatagories.scss'

export const SubCatagories = ({ slideArr, activeLinkData,subCategoryHeading}) => {

    
    const [mappingData,setMappingData]=useState(null)
    const [active, setActive] = useState('')
    
    useEffect(()=>{
        setMappingData(slideArr.filter((data)=>data.category === activeLinkData)[0]?.subCategories)
        setActive(slideArr.filter((data)=>data.category === activeLinkData)[0]?.subCategories[0].category)
        subCategoryHeading(slideArr.filter((data)=>data.category === activeLinkData)[0]?.subCategories[0].category)
        console.log('ACTIVE LINK DATA')

    },[activeLinkData])

    const handleChange=(item)=>{
        // alert(item)
        setActive(item)
        subCategoryHeading(item)
    }


    return (
        <div className="subcatagories">
            {
                mappingData?.length ? mappingData.map((item) => {

                    return <div className="subcatagories-items" key={item?.category}>
                        <p 
                            className={active === item?.category ? 'subcatagories-items-topic activeS' : 'subcatagories-items-topic '}
                            onClick={() => handleChange(item?.category)}
                        > {item?.category}</p>
                        
                    </div>

                })
                    : null
            }

        </div>
    )
}
