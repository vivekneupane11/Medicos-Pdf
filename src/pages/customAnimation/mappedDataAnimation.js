import {useEffect,useState} from 'react';
import { useInView } from 'react-intersection-observer';
 import { useAnimation } from 'framer-motion';

const MappedDataAnimation = (threshold) => {
    const {ref,inView}=useInView({threshold});
    const animation=useAnimation();
    const [isFalse,setIsFalse]=useState(false);
    useEffect(() => {
        if(inView && !isFalse){
            animation.start(i=>({
                opacity:1,
                scale:1,
                y:0,
                transition:{
                    delay:i*.3,
                    ease:'easeIn'
                    // linear:'linear'
                }
            }))
            setIsFalse(!isFalse)
        }
        else if(!inView && !isFalse){
            animation.start(i=>({
                opacity:0,
                scale:.5,
                y:100,
            }))
        }

    }, [inView,animation,threshold])

    return {ref,animation}
}

export default MappedDataAnimation
