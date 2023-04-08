import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './_articleMainTopPlaceholder.scss';

export const MainTopPlaceholder = () => {
    return (
        <div className="mainTopPlaceholder-wrapper">
        <TransitionGroup>
        <div className="mainTopPlaceholder">
                <div className="mainTopPlaceholder-col1">
                    
                         <div className="mainTopPlaceholder-col1-content">
                         
                         <CSSTransition
                            classNames="placeholder"
                            in={true}
                            appear={true}
                            timeout={3000}
                            >
                                <div className="mainTopPlaceholder-col1-content-image"></div>
                                </CSSTransition>
                           
                            <div className="mainTopPlaceholder-col1-content-bottom">
                            <CSSTransition
             classNames="placeholder"
            in={true}
            appear={true}
            timeout={3000}
            >
                                    <h3 className="mainTopPlaceholder-col1-content-bottom-heading"></h3>
                                    </CSSTransition>
                                    <CSSTransition
             classNames="placeholder"
            in={true}
            appear={true}
            timeout={3000}
            >
                                    <h1></h1>
                                    </CSSTransition>

                                    <CSSTransition
             classNames="placeholder"
            in={true}
            appear={true}
            timeout={3000}
            >
            
                                <p ></p>
                                </CSSTransition>

                            </div>

                        </div>



                </div>

                <div className="mainTopPlaceholder-col2">
                   <div  className="mainTopPlaceholder-col2-content">
                   <CSSTransition
                            classNames="placeholder"
                            in={true}
                            appear={true}
                            timeout={3000}
                            >
                                    <div className="mainTopPlaceholder-col2-content-image">

                                    </div>
                                    </CSSTransition>
                                
                                <div className="mainTopPlaceholder-col2-content-bottom">
                                <CSSTransition
                            classNames="placeholder"
                            in={true}
                            appear={true}
                            timeout={3000}
                            >
                                        <h3 className="mainTopPlaceholder-col2-content-bottom-heading"></h3>
                                        </CSSTransition>
                                        <CSSTransition
                            classNames="placeholder"
                            in={true}
                            appear={true}
                            timeout={3000}
                            >
                                        <h1>
                                        </h1>
                                        </CSSTransition>
                                        <CSSTransition
                            classNames="placeholder"
                            in={true}
                            appear={true}
                            timeout={3000}
                            >
                                        
                                   
                                    <p ></p>
                                    </CSSTransition>
                                    

                                    {/* <Link
                                        onClick={() => logEventWithParams('web_article_detail_page_opened')}
                                        style={{ textDecoration: 'none' }}
                                        to={{
                                            pathname: `/articleDetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                                        }}>
                                        <Button type="primary" label="Read More" />
                                    </Link> */}
                                </div>

                            </div>
                        
                </div>

                <div className="mainTopPlaceholder-col3">
                   <div  className="mainTopPlaceholder-col3-content">
                   <CSSTransition
                            classNames="placeholder"
                            in={true}
                            appear={true}
                            timeout={3000}
                            >
                                    <div className="mainTopPlaceholder-col3-content-image">

                                    </div>
                                    </CSSTransition>
                                    
                                <div className="mainTopPlaceholder-col3-content-bottom">
                                   
                                <CSSTransition
                            classNames="placeholder"
                            in={true}
                            appear={true}
                            timeout={3000}
                            >
                                        <h3 className="mainTopPlaceholder-col3-content-bottom-heading"></h3>
                                    </CSSTransition>
                                    <CSSTransition
                            classNames="placeholder"
                            in={true}
                            appear={true}
                            timeout={3000}
                            >
                                    <p ></p>
                                    </CSSTransition>
                                    <CSSTransition
                            classNames="placeholder"
                            in={true}
                            appear={true}
                            timeout={3000}
                            >
                                    <h1></h1>
                                    </CSSTransition>
                                    


                                </div>

                            </div>
                        


                </div>

            </div>
        </TransitionGroup>
           


        </div>
    )
}
