import React, { useState } from 'react'
import "./_checkbox.scss";

const Checkbox = ({ checked, option, disabled }) => {
    const [check,setCheck] = useState(()=>checked)

    return (
        <div className="checkbox-container">
            <div className={`checkbox-container-wrapper${disabled ? "-disabled": ""}`}>
            {/* <input className={`regular-checkbox`} type="checkbox" onChange={()=>setCheck(!check)} checked/> */}
                {check ?
                    <div>
                        {disabled ?
                            <input className={`regular-checkbox${disabled ? "-disabled" : ""}`} onChange={()=>setCheck(!check)} type="checkbox" checked disabled/>
                            :
                            <input className={`regular-checkbox${disabled ? "-disabled" : ""}`} onChange={()=>setCheck(!check)} type="checkbox" checked />
                        }
                    </div>
                    :
                    <div>
                        {disabled ?
                            <input className={`regular-checkbox${disabled ? "-disabled" : ""}`} onChange={()=>setCheck(!check)} type="checkbox" unchecked disabled />
                            :
                            <input className={`regular-checkbox${disabled ? "-disabled" : ""}`} onChange={()=>setCheck(!check)} type="checkbox" unchecked />
                        }
                    </div>}
                <label for="vehicle1">{option}</label>
            </div>
        </div>
    )
}

export default Checkbox
