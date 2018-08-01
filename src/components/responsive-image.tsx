import *  as React from "react"

interface IProps {
    imageSrc: string
    type?: "contain" | "cover"
}

const ResponsiveImage: React.SFC<IProps> = (props) => {
        const style = {
            backgroundImage: `url(${props.imageSrc})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: props.type ? props.type : "contain",
            position: "relative" as "relative",
            height: "100%",
            width: "100%"
        }
        return (
            <div className="responsive-image" style={style} >
                {props.children}
            </div>
        );
}

export default ResponsiveImage