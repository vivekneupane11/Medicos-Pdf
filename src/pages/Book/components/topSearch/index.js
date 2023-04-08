import React from 'react'
import Search from '../../../../components/global/search'
import './_topSearch.scss'

const TopSearch = ({bookDocId,slideDocId}) => {
    return (
        <div className='topSearch-container'>
            <h3 className='topSearch-container-heading'>Discover. Share. Learn.</h3>
            <p className='topSearch-container-para'>Share what you know and love through presentations, infographics, documents and more</p>
            <Search bookDocId={bookDocId} slideDocId={slideDocId}/>        
            
        </div>
    )
}

export default TopSearch
