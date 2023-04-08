
import React from 'react';
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';
import { useLocation } from "react-router-dom";

//LOCAL IMPORTS
import img from '../../assets/images/bookbackg.webp'
import "./index.scss";
import SEO from '../../components/global/SEO';
import ButtonWithArrow from '../Home/components/buttonWithArrow';
import { newTab } from '../../functions/newTabMethod';


const transition = { duration: .4, ease: [0.6, 0.01, -0.05, 0.9] };

// const imgVariants = {
//     initial: {
//         scale: .8,
//         opacity: 0,
//         y: 80,
//         x: 50,
//     },
//     animate: {
//         scale: 1,
//         opacity: 1,
//         y: 0,
//         x: 0,
//     }
// }
// const animate = {
//     initial: {
//         opacity: 0,
//         y: 30,
//         scale: .5
//     },

//     animate: {
//         opacity: 1,
//         y: 0,
//         scale: 1,
//         //   transition: { delay: .4},
//     }
// }
const JournalDetails = () => {
    const location = useLocation();
    const { data } = location.state;
    // const [journalDetailData, setJournalDetailData] = useState(JSON.parse(data))
    let journalDetailData=JSON.parse(data)
 

    function transform(node, index) {
        // console.log('mmmmmmm',node)
        if (node.type === "tag") {
            switch (node.name) {
                case 'st':
                    node.name = 'strong';
                    if (node.children?.length) {
                        if (node?.children[0].data !== undefined) {
                            return <strong key={index} style={{ color: '#333333', fontSize: '22px', fontFamily: 'Nunito', fontWeight: '800', textTransform: 'capitalize' }}>{node.children[0].data}</strong>
                        }

                    }
                    return convertNodeToElement(node, index, transform);

                case 'sec':
                    node.name = 'section';
                    return convertNodeToElement(node, index, transform);

                case 'p':
                    if (node.children?.length) {
                        if (node.children[0].data !== undefined) {
                            return <p key={index} style={{ lineHeight: '1.75', margin: '10px 0' }}>{node.children[0].data}</p>
                        }

                    }
                    return convertNodeToElement(node, index, transform);
                default:    
            }
        }




    }

    const options = {
        decodeEntities: true,
        transform,
    }

    const clickhandlerjornal = () => newTab(journalDetailData?.link,journalDetailData.title,'journal_detail_visited')
    return (
        <div className='journal-detail-page'>

            <SEO image={img} title='MedicosPDF journal detail page' description={journalDetailData.title+journalDetailData?.content} />
            {/*
                 TODO
              <SocialShareForMobile title={journalDetailData.title} shareUrl={journalDetailData?.link}/> */}
            <div
                initial={{
                    y: 400,
                    opacity: 0,
                }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                transition={{ delay: .1, ...transition }}
                className="journal-detail-page-container"
            >
                <h3 className="journal-detail-page-container-title">{journalDetailData.title}</h3>

                <p className="journal-detail-page-container-description">
                    {ReactHtmlParser(journalDetailData?.content, options)}
                </p>

                <div className="journal-detail-page-container-button" onClick={clickhandlerjornal}>
                    <ButtonWithArrow name="For More Info" />
                </div>
            </div>
        </div>
    )
}
export default JournalDetails
