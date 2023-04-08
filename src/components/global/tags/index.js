import React, { useState, useEffect } from 'react'
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
        let isMounted = true;

        if (!props?.loadedTagsFromEdit?.length && props.fileName) {
            setTags([props.fileName, ...tags])
        }

        return () => {
            isMounted = false
        }
    }, [props.fileName])



    useEffect(() => {
        let isMounted = true;
        if (!props?.loadedTagsFromEdit?.length && props.category) {
            setTags([props.category, ...tags])
        }

        return () => {
            isMounted = false
        }
    }, [props.category])

    useEffect(() => {
        let isMounted = true;

        if (!props?.loadedTagsFromEdit?.length && props.subCategory) {
            setTags([props.subCategory, ...tags])
        }

        return () => {
            isMounted = false
        }
    }, [props.subCategory])
    //RENDERING INCOMING SLIDE TAGS FROM loadedTagFromEdit
    useEffect(() => {
        let isMounted = true
        if (isMounted && props?.loadedTagsFromEdit && typeof(props?.loadedTagsFromEdit) == 'string') {
            console.log('slide tags',typeof(props?.loadedTagsFromEdit))
            setTags(props?.loadedTagsFromEdit?.split(','))
        }
        return () => {
            isMounted = false
        }
    }, [props?.loadedTagsFromEdit])

    return (
        <>
            {/* <h3>Tags</h3> */}
            <div className="tags-wrapper">
                <ul className="tags">
                    {tags?.length?  
                    tags?.map((tag, index) => (
                        <li key={index} className="tags-tag">
                            <span className='tags-tag-title'>{tag}</span>
                            <span className='tags-tag-close-icon'
                                onClick={() => removeTags(index)}
                            >
                                x
                            </span>
                        </li>
                    ))
                    :
                    ''
                
                }
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
