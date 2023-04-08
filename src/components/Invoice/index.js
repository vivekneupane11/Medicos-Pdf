import React from 'react'
import { Headings } from '../global/headings';
import { Paragraphs } from '../global/paragraphs';
import './_invoice.scss';

export const Invoice = ({invoices,cartSection}) => {
    return (
        <div className="invoice-wrapper">
        {
            invoices.map((invoice)=>{
                return <div className="invoice-card">
            <div className="invoice-card-top">
                <div className="invoice-card-top-row">
                    <div className="invoice-card-top-row-col">
                        <img src={require("../../images/invoice.png")?.default}/>
                        <h6>St. Independence Embankment, 050105 Bucharest, Romania</h6>
                        <Paragraphs type="muted-text" content="tel: 0987654321"/>

                    </div>
                    <div className="invoice-card-top-row-col2-customer">
                        <Headings type="heading4" content="Billed to:"/>
                        <Paragraphs type="heading-text" content={invoice.customerName}/>
                        <Paragraphs type="muted-text" content={invoice.customerDistrict}/>
                        <Paragraphs type="muted-text" content={invoice.customerCity}/>
                        <Paragraphs type="muted-text" content={invoice.customerTole}/>
                        

                    </div>
                    
                </div>
                <div className="invoice-card-top-row">
                    <div className="invoice-card-top-row-col">
                    <Headings type="heading3" content="Invoice No"/>
                    <Headings type="heading5" content={invoice.invoiceNO}/>

                    </div>
                    <div className="invoice-card-top-row-col2">
                    <div className="invoice-date">
                     <Paragraphs type="heading-text" content="Invoice date:-"/>
                     <Paragraphs type="heading-text" content={invoice.invoiceDate}/>
                    </div>
                    <div className="due-date"> 
                        <Paragraphs type="heading-text" content="Due date:-"/>
                        <Paragraphs type="heading-text" content={invoice.dueDate}/>
                    </div>
                   

                    </div>
                    
                </div>

            </div>
            <div className="invoice-card-main">
                <div >
                    <table className="invoice-card-main-table">
                    <tr className="invoice-card-main-table-header">
                            <th>Items</th>
                            <th>Qty</th>
                            <th>Rate</th>
                            <th>Amount</th>
                        </tr>
                        {
                            cartSection?.map((cart)=>
                            {
                                return  <tr className= "invoice-card-main-table-invoiceDetails">
                                <td>{cart.productName}</td>
                                <td>{cart.quantity}</td>
                                <td>Rs.{cart.rate}</td>
                                <td>Rs.{cart.amount}</td>
                            </tr>

                                
                            })
                        }
                        
                           <tr className="invoice-card-main-table-invoiceTotal">
                            <td>Total</td>
                            <td></td>
                            <td></td>
                            <td>Rs.300</td>
                        </tr>
                    </table>

                


                </div>

            </div>
            <div className="invoice-card-bottom">
                <Headings type="heading5" content="Thank you!"/>
                <div className="invoice-card-bottom-notice">
                    <Paragraphs type="heading-text" content="If you encounter any issues related to the invoice 
                    you can contact us at:"/>
                </div>
                <div className="invoice-card-bottom-email">
                <Headings type="heading6" content="email:"/>
                <Paragraphs type="muted-text" content="chandramani@gmail.com"/>
                </div>

            </div>

        </div>
            }
            )
        }
        
            
        </div>
    )
}
