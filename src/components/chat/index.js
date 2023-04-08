import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearchPlus, faBookmark, faCog, faPaperPlane, faClock } from '@fortawesome/free-solid-svg-icons'
import "./_chat.scss";

const Chat = () => {

    return (
        <div className="chat-container">
            <div className={`chat-container-wrapper`}>
                <div className={`user-list-section`}>
                    <div className="chat-search-container">
                        <input placeholder="Search contact" />
                        <FontAwesomeIcon className="icon" icon={faSearchPlus} />
                    </div>
                    <div className="user-list-section-container">
                        <div className="user-container-active">
                            <img className="user-container-picture" src={require("../../assets/images/profile1.png")?.default} />
                            <div className="user-container-active-text">
                                <h5>John Snow</h5>
                                <p>Typing... </p>
                            </div>
                        </div>


                        <div className="user-container">
                            <img className="user-container-picture" src={require("../../assets/images/profile3.png")?.default} />
                            <div className="user-container-text">
                                <h5>Jane Doe</h5>
                                <p className="time">1 hour ago </p>
                                <p>Computer users and prog... </p>
                            </div>
                        </div>

                        <div className="user-container-border">
                            <img className="user-container-picture" src={require("../../assets/images/Profile Pic.png")?.default} />
                            <div className="user-container-text">
                                <h5>Mila Skylar</h5>
                                <p className="time">1 hour ago </p>
                                <p>Computer users and prog... </p>
                            </div>
                        </div>
                        <div className="user-container-border">
                            <img className="user-container-picture" src={require("../../assets/images/profile2.png")?.default} />
                            <div className="user-container-text">
                                <h5>Sofia Scarlett</h5>
                                <p className="time">1 hour ago </p>
                                <p>Computer users and prog... </p>
                            </div>
                        </div>
                        <div className="user-container-border">
                            <img className="user-container-picture" src={require("../../assets/images/profile1.png")?.default} />
                            <div className="user-container-text">
                                <h5>Tom Klein</h5>
                                <p className="time">1 hour ago </p>
                                <p>Computer users and prog... </p>
                            </div>
                        </div>

                        <div className="user-container-border">
                            <img className="user-container-picture" src={require("../../assets/images/profile2.png")?.default} />
                            <div className="user-container-text">
                                <h5>Sofia Scarlett</h5>
                                <p className="time">1 hour ago </p>
                                <p>Computer users and prog... </p>
                            </div>
                        </div>
                        <div className="user-container-border">
                            <img className="user-container-picture" src={require("../../assets/images/profile1.png")?.default} />
                            <div className="user-container-text">
                                <h5>Tom Klein</h5>
                                <p className="time">1 hour ago </p>
                                <p>Computer users and prog... </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`chat-message-section`}>
                    <div className={`chat-message-section-header`}>
                        <div className="chat-message-section-header-user-info">
                            <img className="chat-message-section-header-user-info-picture" src={require("../../assets/images/profile1.png")?.default} />
                            <div className="chat-message-section-header-user-info-text">
                                <h5>John Snow</h5>
                                <p>last seen today at 1:53am</p>
                            </div>
                        </div>
                        <div className="chat-message-section-header-button-container">
                            <FontAwesomeIcon className="icon" icon={faBookmark} />
                            <FontAwesomeIcon className="icon" icon={faCog} />

                        </div>
                    </div>


                    <div className={`chat-message-section-container`}>
                        <div className={`chat-message-section-container-received-container`}>
                            <div className={`chat-message-section-container-received-container-received`}>
                                <p>It contains a lot of good lessons about effective practices</p>
                                <div className="time">
                                    <FontAwesomeIcon className="icon" icon={faClock} />
                                    <p>3:14am</p>
                                </div>
                            </div>
                        </div>


                        <div className={`chat-message-section-container-send-container`}>
                            <div className={`chat-message-section-container-send-container-send`}>
                                <p>It contains a lot of good lessons about effective practices</p>
                                <div className="time">
                                    <FontAwesomeIcon className="icon" icon={faClock} />
                                    <p>3:14am</p>
                                </div>
                            </div>
                        </div>


                        <div className={`chat-message-section-container-received-container`}>
                            <div className={`chat-message-section-container-received-container-received`}>
                                <p>It contains a lot of good lessons about effective practices</p>
                                <div className="time">
                                    <FontAwesomeIcon className="icon" icon={faClock} />
                                    <p>3:14am</p>
                                </div>
                            </div>
                        </div>


                        <div className={`chat-message-section-container-send-container`}>
                            <div className={`chat-message-section-container-send-container-send`}>
                                <p>It contains a lot of good lessons about effective practices</p>
                                <div className="time">
                                    <FontAwesomeIcon className="icon" icon={faClock} />
                                    <p>3:14am</p>
                                </div>
                            </div>
                        </div>


                    </div>


                    <div className={`chat-message-section-footer`}>
                        <div className="chat-message-section-footer-input-container">
                            <input placeholder="Your message" />
                            <FontAwesomeIcon className="icon" icon={faPaperPlane} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat
