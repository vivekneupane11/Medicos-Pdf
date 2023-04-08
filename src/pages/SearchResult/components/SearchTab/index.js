import React, { useState, useEffect } from "react";
import CaretDown from "../../../../components/global/icons/careteDown";
// import {RiArrowDownSFill} from 'react-icons/ri';
import './index.scss'


const SearchTab = ({ activeTabName, slideCount, bookCount, articleCount,profileCount, journalCount, orderStatus }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedOrder, setSelectedOrder] = useState('Relevance');
    const [openOrder, setOpenOrder] = useState(false)

    const tabs = [
        {
            name: 'All',
            count: slideCount + bookCount + articleCount + journalCount + profileCount
        },
        {
            name: 'Slides',
            count: slideCount
        },
        {
            name: 'Books',
            count: bookCount
        },
        {
            name: 'Channels',
            count: profileCount
        },
        {
            name: 'Journals',
            count: journalCount
        },
        {
            name: 'Articles',
            count: articleCount
        }
    ]
    const orders = [
        {
            name: 'Relevance'
        },
        {
            name: 'Ascending'
        },
        {
            name: 'Descending'
        }
    ]
    const toggleOrder = (orderName = null) => {
        setOpenOrder(!openOrder);
        if (orderName) {
            setSelectedOrder(orderName)
            orderStatus(orderName)
        }
    }

    const activeTabSet = (index, name) => {
        setActiveTab(index)
        activeTabName(name)
    }
    const handeltoggleorder=() => toggleOrder()
    useEffect(() => {
        orderStatus(selectedOrder)
        console.log('searchtab render')
    }, [selectedOrder,orderStatus])
    return <div className='search-header'>
        <div className="search-tab-container">
            {
                tabs.map((tab, index) => {
                    return activeTab === index ?
                        <div key={index} onClick={() => activeTabSet(index, tab?.name)} className='search-tab-active'>
                            <p className='tab-name'>{tab?.name}</p>
                            <p>{tab?.count > 0 && `(${tab?.count})`}</p>
                        </div>
                        :
                        <div key={index} onClick={() => activeTabSet(index, tab?.name)} className='search-tab'>
                            <p className='tab-name'>{tab?.name}</p>
                            <p>{tab?.count > 0 && `(${tab?.count})`}</p>
                        </div>
                })
            }
        </div>

        <div>
        <div onClick={handeltoggleorder} className='order-container'>
                    <p>{`Sort By ${selectedOrder}`}</p>
                    <CaretDown className='icon' />
                    {
                        openOrder  &&
                            <div className='order-list-container'>
                                <p className="smalltext">Sort By   <CaretDown className='icon' /></p>
                                <div className='order-list'>
                                    {
                                        orders.map((order, index) => {
                                            return order.name === selectedOrder ?
                                                <div key={index} onClick={() => toggleOrder(order?.name)}>
                                                    <p className='active-order'>{order?.name}</p>
                                                </div>
                                                :
                                                <div key={index} onClick={() => toggleOrder(order?.name)}>
                                                    <p>{order?.name}</p>
                                                </div>
                                        })
                                    }
                                </div>
                            </div>
                    }
        </div>
      

        </div>
       
    </div>
}

export default SearchTab;