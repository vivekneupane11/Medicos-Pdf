import React, { useContext, useState,useEffect,useRef } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../../components/signUp/authMethods/authentication';
import PreferenceModal from '../global/preferenceModal';
import { DisplayTitle } from '../global/Titles';
import './index.scss';
import { Link } from 'react-router-dom';


const NavbarProfile = (props) => {
    const history = useHistory();
    const { logout } = useContext(AuthContext);
    const [dropdown, setDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const ref=useRef()

    const toggling = () => setDropdown(!dropdown);

    function onClickLogout() {
        logout()
        toggling();
    }


 

    useEffect(() => {
        const checkIfClickedOutside = e => {
          if (dropdown && ref.current && !ref.current.contains(e.target)) {
            setDropdown(false)
          }
        }
    
        document.addEventListener("mousedown", checkIfClickedOutside)
    
        return () => {
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
      }, [dropdown])


    const clickhandlerclicklogout = () => onClickLogout()
    const handeltoggling=() => toggling()

    return (

        <div className="navbarProfile-wrapper" ref={ref}>
            {
                showModal && <PreferenceModal />
            }
            {
                props.profileImage ?
                    <img loading="lazy" onClick={handeltoggling} src={props?.profileImage} alt='profile-image' className="profile-image" />
                    :
                    <div className='avatar' onClick={handeltoggling}>
                        <DisplayTitle title={props?.email?.substring(0, 1)} color='white' type="display4" />
                    </div>
            }
            <ul className={`navbarProfile ${dropdown ? 'navbarProfileshow' : 'navbarProfile'}`}>
                {props.datas.map((name, index) => {
                    if (index === props?.datas?.length - 1) {
                        return <li className="list list2" key={index} >
                            <p onClick={clickhandlerclicklogout}>{name.link}</p>
                        </li>
                    } else if (name.link === "My Profile") {
                        return <li className="list " key={index} >
                            <Link className='list-link' to={name.url + '/' + props.username}>{name.link}</Link>
                        </li>
                    } else {
                        return <li onClick={() => history.push('/register')} className="list " key={index} >
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
