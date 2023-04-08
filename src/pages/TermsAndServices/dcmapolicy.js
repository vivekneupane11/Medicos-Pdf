import React from 'react';
import SEO from '../../components/global/SEO';
import img from '../../assets/images/bookbackg.webp'
import './_termsAndServices.scss';

export const DcmaPolicy = ({ terms }) => {
    return (
        <div className="termsAndConditions-wrapper">

            <SEO image={img} title='MedicosPDF DCMA policy page' description='Terms and conditions of medicos PDf' />
            <div className="termsAndConditions">
                <div className="termsAndConditions-content">
                    <div className="termsAndConditions-content-muted-heading">
                        <p>DMCA Policy</p>
                    </div>
                    <div>
                        <h2 className="termsAndConditions-content-heading">DMCA Policy</h2>
                        <p>
                            Welcome to Medicos Pdf!
                            <br />
                            <br />
                            We here at the Medicos  respect the intellectual property rights of all content creators, whether their work is affiliated with our site or not.
                            <br />
                            <br />
                        </p>
                    </div>

                    <div>

                        <p>
                            If you have reason to suspect that your intellectual property rights have been infringed in any way that connects to our site, we strongly advise that you contact our copyright agent with a complaint as soon as possible. We take all violations of the Digital Millennium Copyright Act of 1998 extremely seriously. In order to ensure your complaint remains legitimate under the DMCA, please ensure your copyright complaint contains all of the following information:
                            <br />
                        </p>

                        <ul className='ul'>
                            <li>A signature, electronic or physical, of an individual who has been authorized to represent you, the copyright holder;</li>
                            <li>Clear identification of the copyrighted item(s) in question, as well as identification of the work(s) infringing on the copyright holder’s intellectual property rights;</li>
                            <li>Contact information for you, the copyright holder, that BookTwoLives.com can use to contact you, including your full name, telephone number, physical address and e-mail address;</li>
                            <li>A written letter stating that you the copyright holder, “in good faith believes that the use of the material in the manner complained of is not authorized by the copyright owner, its agent or the law; </li>
                            <li> A written letter stating that all of the information provided in the statement above is wholly accurate, and reaffirming that the writer of said letter has been legally authorized, under penalty of perjury, to represent you, the copyright holder.
                            </li>
                        </ul>

                    </div>

                    <div>
                        <h3 className="h3">Contacting Our Web Site

                        </h3>
                        <p>The statement of complaint that you provide us, containing all of the above information, should be sent here to our Designated Copyright Agent.

                        </p>

                        <p>
                            PLEASE REMEMBER THAT IF YOU CHOOSE TO MISREPRESENT ANY OF THE DETAILS REGARDING AN ALLEGED COPYRIGHT INFRINGEMENT, YOU WILL BE SUBJECT TO SERIOUS CIVIL PENALTIES UNDER FEDERAL LAW, INCLUDING ANY MONETARY DAMAGES, COURT COSTS AND LAWYERS FEES ACCRUED BY US, AND ANY COPYRIGHT HOLDERS OR COPYRIGHT HOLDER’S LICENSEES WHO ARE INJURED IN ANY CAPACITY FOLLOWING OUR RELIANCE ON THE VERACITY OF YOUR REPRESENTATION. YOU COULD ALSO BE CRIMINALLY PROSECUTED FOR ACTS OF PERJURY.                          </p>

                        <p>Do not take anything outlined in this document as formal legal advice. For further information on the details required to lodge a formal DMCA notification, please refer to 17 U.S.C. 512(c)(3).</p>






                    </div>

                </div>
                {/* <div className="termsAndConditions-button">
                   <button className="cancel">Not Right Now..</button>
                   <button className="accept">Accept the terms</button>
                </div> */}
            </div>


        </div>
    )
}
