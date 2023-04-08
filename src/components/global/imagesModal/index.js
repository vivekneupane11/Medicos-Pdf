import React from 'react'
import { Link } from 'react-router-dom'
import CloseCircle from '../icons/xMark_Circle'
import { Avatar } from '../images'
import image from '../../../assets/images/book/loaderpdf.webp'
import './_imagesModal.scss';
import { CSSTransition } from 'react-transition-group'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const ImagesModal = ({data,closeModal,modalIsOpen}) => {
    const handelclose=() => closeModal()
  return <div className='imagemodal-wrapper'>
      {
          modalIsOpen &&
          (  <CSSTransition
            classNames="tipsTransition"
            in={modalIsOpen}
            appear={modalIsOpen}
            onExited={closeModal}
            unmountOnExit
            timeout={200}>
          <div className='imagemodal-wrapper-container' >
          <div className='imagemodal-wrapper-container-image'>
              <LazyLoadImage className="modal-image" src={data?.image? data?.image:image} alt={"img"} effect='blur' />
          {/* <img className="modal-image" src={data?.image? data?.image:image} alt="img" /> */}
              <div className='close' onClick={handelclose}>
              <CloseCircle className="icon"  />
              </div>
          </div>
          <div className='imagemodal-wrapper-container-userdetails'>
          <Link
                to={`/profile/${data?.author}`}
                className="user-info">
                    <Avatar
                        Image={data?.userAvatar}
                        text={data?.username ? data?.username : 'medicos.int7'}
                        size='35px'
                    />
                    <h6>{data?.username ? data?.username : 'medicos.int7'}</h6>
                </Link>
          </div>
      </div>
          </CSSTransition>)
      }
      

  </div>
}

export default ImagesModal