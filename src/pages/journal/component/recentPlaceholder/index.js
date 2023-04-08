import React from 'react'
import { CSSTransition } from 'react-transition-group'
import './_recentJournalPlaceholder.scss';

export const RecentJournalPlaceholder = () => {
    return (
        <div className='recentJournalPlaceholder-wrapper'>
            <h1 className='heading'>Recent Journals</h1>
            <div className='recentJournalPlaceholder-wrapper-container'>
            <div className='recentJournalPlaceholder-wrapper-container-col1'>
                <div className='item'>
                    <CSSTransition classNames="placeholder" in={true} timeout={3000} appear={true}><h2></h2></CSSTransition>
                    <CSSTransition classNames="placeholder" in={true} timeout={3000} appear={true}><h3></h3></CSSTransition>
                    <CSSTransition classNames="placeholder" in={true} timeout={3000} appear={true}><p></p></CSSTransition>
                 </div>
                <div className='item'>
                    <CSSTransition classNames="placeholder" in={true} timeout={3000} appear={true}><h2></h2></CSSTransition>
                    <CSSTransition classNames="placeholder" in={true} timeout={3000} appear={true}><h3></h3></CSSTransition>
                    <CSSTransition classNames="placeholder" in={true} timeout={3000} appear={true}><p></p></CSSTransition>
                </div>

            </div>
            <div className='recentJournalPlaceholder-wrapper-container-col1'>
                <div className='item'>
                    <CSSTransition classNames="placeholder" in={true} timeout={3000} appear={true}><h2></h2></CSSTransition>
                    <CSSTransition classNames="placeholder" in={true} timeout={3000} appear={true}><h3></h3></CSSTransition>
                    <CSSTransition classNames="placeholder" in={true} timeout={3000} appear={true}><p></p></CSSTransition>
                </div>
                <div className='item'>
                    <CSSTransition classNames="placeholder" in={true} timeout={3000} appear={true}><h2></h2></CSSTransition>
                    <CSSTransition classNames="placeholder" in={true} timeout={3000} appear={true}><h3></h3></CSSTransition>
                    <CSSTransition classNames="placeholder" in={true} timeout={3000} appear={true}><p></p></CSSTransition>
                </div>

            </div>
            </div>
            
            
        </div>
    )
}
