import React from 'react'
import './_confirmationModal.scss'
import Close from '../icons/xMark'

const ConfirmationModal = ({show,cancel,confirm}) => {
    const cancelEvent =()=>cancel(false)
    const confirmEvent=()=>confirm(true)
    return (
        <div className={`confirmationModal-container ${show?'confirmationModal-container-fadeIn':'confirmationModal-container-fadeOut'}`}>
            <div className='confirmationModal-container-wrapper'>
                <div className='confirmationModal-container-wrapper-top' onClick={cancelEvent}>
                    <Close className='confirmationModal-container-wrapper-top-icon' />

                </div>
                <div className='confirmationModal-container-wrapper-mid'>
                    <h4 className='confirmationModal-container-wrapper-mid-head'>Are you sure to delete this?</h4>
                    <p className='confirmationModal-container-wrapper-mid-para'>If you delete this you can't recover it?</p>
                </div>

                <div className='confirmationModal-container-wrapper-bottom'>
                    <button className='confirmationModal-container-wrapper-bottom-btnCancel' onClick={cancelEvent}>cancel</button>
                    <button className='confirmationModal-container-wrapper-bottom-btnConfirm' onClick={confirmEvent}>Confirm</button>
                   

                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal
