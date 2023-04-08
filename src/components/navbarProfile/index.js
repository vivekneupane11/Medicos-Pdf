import React, { useContext, useState } from 'react';
import { AuthContext } from '../../components/signUp/authMethods/authentication';
import PreferenceModal from '../global/preferenceModal';
import './index.scss';


const NavbarProfile = (props) => {
    const { logout, user } = useContext(AuthContext)
    const [dropdown, setDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const toggling = () => setDropdown(!dropdown);
    function onClickLogout() {
        logout()
        toggling();
    }
    return (

        <div className="navbarProfile-wrapper">
            {
                showModal && <PreferenceModal />
            }
            <img onClick={() => toggling()} src={props?.profileImage} className="profile-image" />
            <ul className={`navbarProfile ${dropdown ? 'navbarProfileshow' : 'navbarProfile'}`}>
                {props.datas.map((name, index) => {
                    if (index == props?.datas?.length - 1) {
                        return <li className="list list2" key={index} >
                            {/* <img src={name.image} className="icon" /> */}
                            <p onClick={() => onClickLogout()}>{name.link}</p>
                        </li>
                    } else if (name.link == "My Profile") {
                        return <li className="list " key={index} >
                            {/* <img src={name.image} className="icon" /> */}
                            <a className='list-link' href={name.url + '/' + user?.uid}>{name.link}</a>
                        </li>
                    } else {
                        return <li onClick={()=>setShowModal(true)} className="list " key={index} >
                            {/* <img src={name.image} className="icon" /> */}
                            <a className='list-link' >{name.link}</a>
                        </li>
                    }
                }
                )}


            </ul>
        </div>

    )
}

export default NavbarProfile
