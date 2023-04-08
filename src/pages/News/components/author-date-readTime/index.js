import React,{useState,useEffect} from 'react'
import './_authorDateReadDate.scss'
const AuthorDateRead = ({author,authorColor,link,date,readTime,color,fontSize}) => {

  
    const [isType1True,setIsType1True]=useState(false);
    const [isType2True,setIsType2True]=useState(false);
    const [isType3True,setIsType3True]=useState(false);


    useEffect(() => {

        const check=()=>{
            if(typeof author==='string' && typeof date==='string' && typeof readTime==='string'){
                setIsType1True(!isType1True)
            }
            else if(typeof date==='string' && typeof readTime==='string'){
                setIsType2True(!isType2True)
            }
            else if(typeof date==='string'){
                setIsType3True(!isType3True)
            }
            else{
                console.log('no match');
            }

           
        }
        check();
       
    }, [])

    return (
        <>
         { isType1True?

            <div className='authorDateReadDate-wrapper' style={{fontSize:`${fontSize}`}}>
                <div className='authorDateReadDate-wrapper-author'>
                    <span className='authorDateReadDate-wrapper-author-firstSpan' style={{fontSize:`${fontSize}`,color:`${color}`}}>
                        By:<a href={link} style={{fontSize:`${fontSize}`,color:`${authorColor}`}}>{author}</a>
                    </span>
                </div>
                <div className='authorDateReadDate-wrapper-dot' style={{color:`${color}`,border:`1px solid ${color}`}}></div>
                <div className='authorDateReadDate-wrapper-date' style={{color:`${color}`}}>{date}</div>
                <div className='authorDateReadDate-wrapper-dot' style={{color:`${color}`,border:`1px solid ${color}`}} ></div>
                <div className='authorDateReadDate-wrapper-readTime' style={{color:`${color}`}}>{readTime}</div>

            </div>
           :
           ""
        }

        {
            isType2True?

            <div className='authorDateReadDate-wrapper'>
                <div className='authorDateReadDate-wrapper-date' style={{color:`${color}`,fontSize:`${fontSize}`}}>{date}</div>
                <div className='authorDateReadDate-wrapper-dot' style={{color:`${color}`,border:`1px solid ${color}`}}></div>
                <div className='authorDateReadDate-wrapper-readTime' style={{color:`${color}`,fontSize:`${fontSize}`}}>{readTime}</div>
            </div>
            :
            ""
        }

        { isType3True?

            <div className='authorDateReadDate-wrapper'>
                <div className='authorDateReadDate-wrapper-date' style={{color:`${color}`,fontSize:`${fontSize}`}}>{date}</div>
            </div>
            :
            ""
        }
            

            
        </>
    )
}

export default AuthorDateRead
