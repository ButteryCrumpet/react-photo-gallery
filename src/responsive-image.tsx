import *  as React from "react"

interface IProps {
    imageSrc: string
    type?: "contain" | "cover"
}

const ResponsiveImage: React.SFC<IProps> = (props) => {
    const imgCss = {
        backgroundImage: `url(${props.imageSrc})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: props.type ? props.type : "contain",
        height: "100%",
        width: "100%"
    }
    return (
        <div className="responsive-img" style={imgCss} />
    );
}

export default ResponsiveImage;