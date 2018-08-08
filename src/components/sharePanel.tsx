import * as React from "react"
import { FacebookShareButton, TwitterShareButton } from "react-share"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faLink } from "@fortawesome/free-solid-svg-icons"
import copyToClipboard from "../helpers/copytoclipboard"

const SharePanel: React.SFC<{}> = () => {
    const copy = () => {
        copyToClipboard(window.location.href)
    }
    return (
        <div className="share-panel">
            <ul className="links">
                <li>
                    <FacebookShareButton url={window.location.href}>
                        <FontAwesomeIcon icon={faFacebook} />
                    </FacebookShareButton>
                    <div className="caption">Share on Facebook</div>
                </li>
                <li>
                    <TwitterShareButton url={window.location.href}>
                        <FontAwesomeIcon icon={faTwitter} />
                    </TwitterShareButton>
                    <div className="caption">Share on Twitter</div>
                </li>
                <li onClick={copy}>
                    <FontAwesomeIcon icon={faLink} />
                    <div className="caption">Copy Link</div>
                </li>
            </ul>
        </div>
    )
}



export default SharePanel