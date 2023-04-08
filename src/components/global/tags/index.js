import React, { useState,useEffect } from 'react'
import './_tags.scss'


const Tags = (props) => {

    const [tags, setTags] = useState([]);
    const removeTags = indexToRemove => {
        setTags([...tags.filter((value, index) => index !== indexToRemove)]);
        props.selectedTags([...tags.filter((value, index) => index !== indexToRemove)]);
    };
    const addTags = event => {
        if (tags.length < 50) {
            if (event.target.value !== "") {
                setTags([...tags, event.target.value]);
                props.selectedTags([...tags, event.target.value]);
                event.target.value = "";
            }
        }
    };
    
    useEffect(() => {
        let isMounted=true;
   
       if(props.fileName){
            setTags([...tags,props.fileName])
        }
     
        return () => {
             isMounted=false
        }
    }, [props.fileName ])

    useEffect(() => {
        let isMounted=true;
        if(props.category){
            setTags([...tags,props.category])
        }
   
        return () => {
             isMounted=false
        }
    }, [props.category ])

    useEffect(() => {
        let isMounted=true;
   
       if(props.subCategory){
            setTags([...tags,props.subCategory])
        }
     
        return () => {
             isMounted=false
        }
    }, [props.subCategory ])

    return (
        <>
            {/* <h3>Tags</h3> */}
            <div className="tags-wrapper">
                <ul className="tags">
                    {tags.map((tag, index) => (
                        <li key={index} className="tags-tag">
                            <span className='tags-tag-title'>{tag}</span>
                            <span className='tags-tag-close-icon'
                                onClick={() => removeTags(index)}
                            >
                                x
                            </span>
                        </li>
                    ))}
                </ul>
                <input
                    className="tag-input-field"
                    type="text"
                    onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
                    placeholder="+ Add"
                />
            </div>

        </>
    )
}

export default Tags
