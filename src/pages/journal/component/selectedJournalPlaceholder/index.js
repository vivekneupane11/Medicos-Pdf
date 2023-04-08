import React from 'react'
import { CSSTransition } from 'react-transition-group';
import './_selectedJournalPlaceholder.scss';

export const SelectedPlaceholder = () => {
    return (
        <div className='selectedJournalPlaceholder-wrapper'>
        <CSSTransition classNames="placeholder" timeout={3000} in={true} appear={true}>
            <div className='selectedJournalPlaceholder-wrapper-col1' >
            </div>
        </CSSTransition>
            
            <div className='selectedJournalPlaceholder-wrapper-col2' >
            <CSSTransition classNames="placeholder" timeout={3000} in={true} appear={true}><h1></h1></CSSTransition>
            <CSSTransition classNames="placeholder" timeout={3000} in={true} appear={true}><h2></h2></CSSTransition>
            <CSSTransition classNames="placeholder" timeout={3000} in={true} appear={true}><p></p></CSSTransition>
            <CSSTransition classNames="placeholder" timeout={3000} in={true} appear={true}><h3></h3></CSSTransition>
            <CSSTransition classNames="placeholder" timeout={3000} in={true} appear={true}><h4></h4></CSSTransition>
            <CSSTransition classNames="placeholder" timeout={3000} in={true} appear={true}><p></p></CSSTransition>
            <CSSTransition classNames="placeholder" timeout={3000} in={true} appear={true}><p></p></CSSTransition>
               

            </div>
            <CSSTransition classNames="placeholder" timeout={3000} in={true} appear={true}>
            <div className='selectedJournalPlaceholder-wrapper-col1' >

            </div>
            </CSSTransition>
           
            
        </div>
    )
}
