import React from "react";
import { Link } from "react-router-dom";
import TextClamp from 'react-string-clamp';
import NewsLinkTag from "../../../../components/global/newsLinkTag";
import { getColorByIndex, getReadTime } from "../../../../functions/tagColorAndReadTimeMethod";

import AuthorDateRead from "../../../News/components/author-date-readTime";

const JournalCard = ({ data, index, sourceDocId }) => {
 
    let time_to_read = getReadTime(data.content) + ' min read'


    return <div className="journal-card-wrapper-content-col1-item-content" key={index}>
        <NewsLinkTag color={getColorByIndex(index)} tag={data?.creator} />
        <Link
            className="links"
            to={{
                pathname: '/journaldetails',
                state: {
                    data: JSON.stringify(data),
                }
            }}>
            <h3 className="journal-card-wrapper-content-col1-item-content-heading">{data?.title}</h3>
            <TextClamp
                text={data.contentSnippet}
                lines={3}
                element='p'
                className="journal-card-wrapper-content-col1-item-content-para"
            />

        </Link>

        <AuthorDateRead date={new Date(data.isoDate).toDateString()} readTime={time_to_read} color='#9f9f9f' fontSize='12px' />
    </div>
}

export default React.memo(JournalCard);