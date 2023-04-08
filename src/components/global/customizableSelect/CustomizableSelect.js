import React,{useState} from 'react'
import './_customizableSelect.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'



const CustomizableSelect = (props) => {

       const options=[...props.names];
    

        const [isOpen, setIsOpen] = useState(false);
        const [selectedOption, setSelectedOption] = useState(null);

        const toggling = () => setIsOpen(!isOpen);

        const onOptionClicked = value => () => {
            setSelectedOption(value);
            setIsOpen(false);
          
        };


    return (

      <>
      <h3>Category</h3>
      <div className="DropDownContainer">
            <div className="DropDownContainer-Header" onClick={toggling}>
              <p>{selectedOption || options[0]}</p>
              <FontAwesomeIcon icon={faSortDown} className={`DropDownContainer-Header-icon ${isOpen?'DropDownContainer-Header-icon1':'DropDownContainer-Header-icon'}`} />
            </div>
            {isOpen && (
            <div className="DropDownContainer-list">
                {options.map(option => (
                    <div className="DropDownContainer-list-item" onClick={onOptionClicked(option)} key={Math.random()}>
                    {option}
                    </div>
                ))}
            </div>
            )}
      </div>
    </>
    )
}

export default CustomizableSelect

//  <CustomizableSelect names={['ram','shyam','hari','ram','shyam','hari']}/> use like this