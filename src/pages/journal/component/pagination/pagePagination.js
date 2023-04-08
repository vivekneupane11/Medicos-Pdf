import React, { useState } from 'react'
import './_paginationPage.scss';
import ArrowLeft from '../../../../components/global/icons/arrow_left'
import ArrowRight from '../../../../components/global/icons/arrow_right'
// import { number } from 'yup/lib/locale';

const PagePagination = ({pagecount,pageClick,prevClick,nextClick}) => {
    // console.log('artice number',pagecount);
    const [active,setActive]=useState(0)
    let pageNumber=[];
    for(let i=1; i<=pagecount; i++){
        pageNumber.push(i)
    }
    console.log('article number',pageNumber?.length)
    // const handelselect=()=>{
    //     pageClick(number)
    //     setActive(true)
        
    // }
    const activeprev=()=>setActive(active-1)
    const prevhandel=()=>prevClick()
    const activenext=()=>setActive(active+1)
    const nexthandel=()=>nextClick()
  return (
    <div className='pagination-wrapper'>
        <div className='pagination-wrapper-container'>
            <div className={active===0?'displaynone':'next-prev-button'} onClick={activeprev} >
                <div onClick={prevhandel}> 
                <ArrowLeft className='icon'/>

                </div>

            </div>
            {
                pageNumber.map((number,index)=>(
                    <>
                    <div   key={index} onClick={ ()=>setActive(index)} >
                    <div  className={`pageNumber-Button ${index===active? 'active':''}`} onClick={ ()=>pageClick(index) }   >
                        {/* {console.log('journal paging',index+1,number)} */}
                        <div className='pageNumber' >
                        {number}
                        </div>
                    </div>
                    </div>
                    </>
                ))
            }
            <div className={active===pageNumber?.length-1?'displaynone':'next-prev-button'}  onClick={activenext} >
                <div onClick={nexthandel} >

                <ArrowRight className='icon' />
                </div>

                {console.log('nextbtn',active)}
            </div>

        </div>
    </div>
  )
}

export default PagePagination