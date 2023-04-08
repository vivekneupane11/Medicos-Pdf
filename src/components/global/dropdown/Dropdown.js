import React,{useState} from 'react'
import './_dropdown.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'


const Dropdown = (props) => {

    const [dropdown1, setDropdown1] = useState(false);
    const toggling1 = () => {
        if(dropdown2==true)
        {
        setDropdown2(false);
        }
        setDropdown1(!dropdown1)
    };

    const [dropdown2, setDropdown2] = useState(false);
    const toggling2 = () => {
        if(dropdown3==true || dropdown4==true)
        {
        setDropdown3(false);
        setDropdown4(false);
        }
        setDropdown3(!dropdown3)
        setDropdown2(!dropdown2)
    
    };

    const [dropdown3, setDropdown3] = useState(false);
    const toggling3 = () => {
        if(dropdown4==true)
        {
        setDropdown4(false);
        }
        setDropdown3(!dropdown3)
    
    }
    ;

    const [dropdown4, setDropdown4] = useState(false);
    const toggling4 = () => {
        if(dropdown3==true)
        {
        setDropdown3(false);
        }

        setDropdown4(!dropdown4)
    };


    return (
        <div className="dropdown-container">
            <h4>DropDowns</h4>
            <p>Multilevel</p>
            <button onClick={toggling1}>click me</button>
            <ul className={`dropdown1 ${dropdown1? 'dropdown1show':'dropdown1'}`}>
                {props.list1.map(data=>(
                     <li><a href={data.link}>{data.li1}</a></li>
                ))}
                <li>
                    <div className="dropdown2" onClick={toggling2}>
                        <a href="#home">{props.list2head}</a>
                        <FontAwesomeIcon icon={faSortDown} className={`icon2 ${dropdown2? 'icon2show':'icon2'}`}/>
                    </div>
                    <ul className={`dropdown2-item ${dropdown2? 'dropdown2-itemshow':'dropdown2-item'}`}>

                     {props.list2.map(data=>(
                        <li><a href={data.link}>{data.li1}</a></li>
                     ))}
                        <li>
                            <div className="dropdown3" onClick={toggling3}>
                            <a href="#home">{props.list3head}</a>
                                <FontAwesomeIcon icon={faSortDown} className={`icon3 ${dropdown3? 'icon3show':'icon3'}`}/>
                            </div>
                            <ul className={`dropdown3-item ${dropdown3? 'dropdown2-itemshow':'dropdown3-item'}`}>
                            {props.list3.map(data=>(
                                   <li><a href={data.link}>{data.li1}</a></li>
                                ))}
                               
                            </ul>
                          
                        </li>
                        <li>
                            <div className="dropdown4" onClick={toggling4}>
                            <a href="#home">{props.list3head}</a>
                                <FontAwesomeIcon icon={faSortDown} className={`icon4 ${dropdown4? 'icon4show':'icon4'}`}/>
                            </div>
                            <ul className={`dropdown4-item ${dropdown4? 'dropdown4-itemshow':'dropdown4-item'}`}>
                                {props.list4.map(data=>(
                                   <li><a href={data.link}>{data.li1}</a></li>
                                ))}
                               
                            </ul>
                           
                        </li>
                    </ul>
                </li>
                
               
            </ul>
            
        </div>
    )
}

export default Dropdown
