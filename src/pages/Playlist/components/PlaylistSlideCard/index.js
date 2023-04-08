import React, { useContext } from 'react';
import './index.scss';
import { Avatar} from '../../../../components/global/images';

import filterSlideSubcategory from '../../../../functions/filterSlideSubCategory';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../components/signUp/authMethods/authentication';
import ArrowRight from '../../../../components/global/icons/arrow_right';
import Close from '../../../../components/global/icons/xMark';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const PlaylistSlideCard = ({index,slideData,addToPlayListHandler})=>{
    const { username:usernameauth } = useContext(AuthContext)

    return <section className="playlist-slidecard">

        <span class="playlist-rank-number">{index + 1}</span>
        <div  onClick={() => addToPlayListHandler(slideData?.SlideName)}>
        <Close className='closeIcon' />
        </div>

        <aside className='card-thumbnails'>
        <Link
    className='links'
    to={{
        pathname: `/slidedetails/${slideData?.SlideName}/${slideData?.slideCategory}/${filterSlideSubcategory(slideData?.slideSubCategory)}`,
        state: {
            data: JSON.stringify(slideData),
            wholeData: JSON.stringify(slideData),
        }
    }}>  
       {/* <img loading="lazy" src={slideData?.slideImages[0]} alt='Slides thumbnail image' /> */}
    <LazyLoadImage src={slideData?.slideImages[0]} alt='Slides thumbnail image' effect='blur'/>
     </Link>
        </aside>
    <aside className='slide-descriptions'>
   
    <Link
    className='links'
    to={{
        pathname: `/slidedetails/${slideData?.SlideName}/${slideData?.slideCategory}/${filterSlideSubcategory(slideData?.slideSubCategory)}`,
        state: {
            data: JSON.stringify(slideData),
            wholeData: JSON.stringify(slideData),
        }
    }}> <h3> {slideData?.SlideName.split('-',1)[0]} </h3> </Link>

<span>{slideData?.slideCategory}</span>
<ArrowRight className='playlist-categoryAndSubCategory-icon' />
<span> {slideData?.slideSubCategory} </span>
<p>{slideData?.slideDescription}</p>
<div className='user-descriptions'>
<Avatar size={'20px'} Image={slideData?.userAvatar} text={usernameauth} />
<p className='user-avatar-name'>{slideData?.username}</p>
</div>

    </aside>
    </section>
    
  
}

export default PlaylistSlideCard;