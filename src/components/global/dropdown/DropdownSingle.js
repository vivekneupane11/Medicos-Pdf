import React,{useState} from 'react'
import './_dropdownSingle.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'


const DropdownSingle = (props) => {

//    console.log(props.datas);
    const [dropdown, setDropdown] = useState(false);
    const toggling = () =>setDropdown(!dropdown);

    return (
        
            <div className="dropdown-wrapper">
                
                <button 
                // className="dropdown-btn"
                 onClick={toggling}> 
                Category
                <FontAwesomeIcon icon={faSortDown} className={`icon2 ${dropdown? 'icon2show':'icon2'}`}/>
                </button>
                <ul className={`dropdown ${dropdown? 'dropdownshow':'dropdown'}`}>
                    {props.datas.map((name,index)=>(
                        <li key={index}>
                            <img src={name.image} className="icon" />
                            <a href={name.url}>{name.link}</a>
                        </li>
                    ))}
                
                
                </ul>
            </div>
        
    )
}

export default DropdownSingle
