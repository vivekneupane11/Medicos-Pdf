import { useState } from "react";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
import ClipLoader from "react-spinners/ClipLoader";
import SyncLoader from "react-spinners/SyncLoader";



// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Loading({ type = 'hash', loading = true, color = "#c5c5c5", size = 50 }) {
    const renderLoader = () => {
        switch (type) {
            case 'clip':
                return <ClipLoader color={color} loading={loading} css={override} size={size} />
            case 'hash':
                return <HashLoader color={color} loading={loading} css={override} size={size} />
            case 'sync':
                return <SyncLoader color={color} loading={loading} css={override} size={size} />
        }
    }
    return (
        <div className="loading-container">
            {renderLoader()}
        </div>
    );
}

export default Loading;