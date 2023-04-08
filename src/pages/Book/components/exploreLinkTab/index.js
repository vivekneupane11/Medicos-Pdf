import React, { useEffect, useState } from 'react';
import SwiperCore, { Autoplay, Controller, Pagination } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/swiper.scss';
import { Headings } from '../../../../components/global/headings';
import './_exploreLinkTab.scss';
SwiperCore.use([Autoplay]);
SwiperCore.use([Controller]);
SwiperCore.use([Pagination]);


const ExploreLinkTab = ({ links, activeData }) => {

    const [activeTab, setActiveTab] = useState(0);
    const [screenWidth, setScreenWidth] = useState('');
    const handleClick = (link, index) => {
        setActiveTab(index)
        activeData(link)

    }

    useEffect(() => {

        const CurrentScreenSize = () => {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', CurrentScreenSize)

        return () => {
            window.removeEventListener('resize', CurrentScreenSize)
        }

    }, [])


    return (
        <nav className="exploreLink">

            <div className={`exploreLinkTab move${activeTab}`}>

                {links.map((link, index) => (

                    <div key={index} className="exploreLinkTab-container">
                        {index === activeTab ?
                            <div className="exploreLinkTab-container-link-active" onClick={() => handleClick(link, index)}>

                                <Headings
                                    className="tabText"
                                    type="heading6"
                                    href={link.url}
                                    key={link.id}
                                    content={link.linkName}
                                    active={true}
                                />


                            </div>
                            :
                            <div className="exploreLinkTab-container-link " onClick={() => handleClick(link, index)}>
                                <Headings
                                    className="tabText"
                                    type="heading6"
                                    href={link.url}
                                    key={link.id}
                                    content={link.linkName}
                                    active={false}

                                />


                            </div>
                        }

                    </div>

                ))}

            </div>

        </nav>
    )
}
export default ExploreLinkTab
