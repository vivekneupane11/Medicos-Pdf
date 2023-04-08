import React from 'react'
import Search from '../../../../components/global/search'
import './_topSearch.scss'
import background from '../../../../assets/images/bookbackg.webp';


const TopSearch = ({bookDocId,slideDocId,placeholder}) => {
    return (
        <div className='topSearch-container' style={{backgroundImage:`url(${background})` }  }>
            <h3 className='topSearch-container-heading'>Discover. Share. Learn.</h3>
            <p className='topSearch-container-para'>Share what you know and love through presentations, infographics, documents and more</p>
            <Search/>        
            
        </div>
    )
}
export default TopSearch
