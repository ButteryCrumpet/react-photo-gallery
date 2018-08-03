import * as React from "react"
import { FacebookShareButton, TwitterShareButton } from "react-share"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faLink } from "@fortawesome/free-solid-svg-icons"

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

const copyToClipboard = (string: string) => {
    const el = document.createElement('textarea')

    el.value = string
    el.contentEditable = "true"
    el.readOnly = true
    el.style.position = "absolute"
    el.style.height = "0px"
    el.style.width = "0px"
    el.style.fontSize = "40px"
    
    document.body.appendChild(el)
    el.select()
    el.setSelectionRange(0, string.length)
    const result = document.execCommand('copy')
    document.body.removeChild(el)
    return result
}

export default SharePanel