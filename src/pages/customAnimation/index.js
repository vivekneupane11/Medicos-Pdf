import {useEffect,useState} from 'react';
import { useInView } from 'react-intersection-observer';
 import { useAnimation } from 'framer-motion';

const CustomAnimation = (hidden,visible,threshold) => {
    const {ref,inView}=useInView({threshold});
    const animation=useAnimation();
    const [isFalse,setIsFalse]=useState(false);
    useEffect(() => {
        if(inView && !isFalse){
            animation.start(visible)
            setIsFalse(!isFalse)
        }
        else if(!inView && !isFalse){
            animation.start(hidden)
        }

    }, [inView,animation,visible,hidden,threshold])

    return {ref,animation}
}

export default CustomAnimation
