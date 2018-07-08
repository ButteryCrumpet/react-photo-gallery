import * as React from "react"

interface IProps {
    active: boolean
    children?: any
}

const DropDown: React.SFC<IProps> = (props) => {
    const innerStyle = {
        padding: "1px",
        transform: `translateY(${props.active ? "0" : "-100%"})`,
        transition: "transform 0.2s ease-in",
    }
    const containerStyle = {
        overflow: "hidden",
    }
    return (
        <div style={containerStyle}>
            <div style={innerStyle}>
            {props.children}
            </div>
        </div>
    )
}

export default DropDown