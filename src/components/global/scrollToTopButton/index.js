import React, {useState,useEffect} from 'react';
import './_scrollToTopButton.scss'
import ArrowUp from '../icons/arrow_up';
  
const ScrollToTopButton = () =>{
  
  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const winScroll = document.documentElement.scrollTop;
    const height=document.documentElement.scrollHeight-document.documentElement.clientHeight;
    const scrolled=(winScroll / height)*100;
    if (scrolled > 50){
      setVisible(true)
    } 
    else{
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };
  const scrolltop=()=>scrollToTop() ;

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
      return () => {
        window.removeEventListener('scroll', toggleVisible);
      }
  }, [])
  
  return (
    <button className={`scrollToTop-btn ${visible?'scrollToTop-btn-active':''}`}>
     <div  onClick={scrolltop} style={{display: visible ? 'inline' : 'none'}}  >

     <ArrowUp
     
     className='scrollToTop-btn-icon'
     />
     </div>
    </button>
  );
}
  
export default ScrollToTopButton;