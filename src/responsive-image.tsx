import *  as React from "react"

interface IProps {
    imageSrc: string
    type?: "contain" | "cover"
}

interface IState {
    loaded: boolean
    image: HTMLImageElement
}

class ResponsiveImage extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)
        this.state = {
            loaded: false,
            image: new HTMLImageElement
        }
    }

    render() {
        
        return (
            <div className="responsive-img" style={this.getImageStyle()} />
        );
    }

    private getImageStyle = () => {
        return {
            backgroundImage: `url(${this.props.imageSrc})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: this.props.type ? this.props.type : "contain",
            height: "100%",
            width: "100%"
        }
    }
}

export default ResponsiveImage;