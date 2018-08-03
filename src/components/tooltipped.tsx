import * as React from "react"

interface IProps {
    content: string
    tag?: string
}

const Tooltipped: React.SFC<IProps> = (props) => {
    const Tag = props.tag ? props.tag : "div"
    return (
        <Tag>
            {props.children}
            <div>{props.content}</div>
        </Tag>
    )
}

export default Tooltipped