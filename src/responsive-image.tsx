import *  as React from "react"

interface IProps {
    imageSrc: string
    type?: "contain" | "cover"
}

interface IState {
    loaded: boolean
}


class ResponsiveImage extends React.Component<IProps, IState> {
    
    constructor(props: IProps) {
        super(props)
        this.state = {
            loaded: false,
        }
    }

    componentDidMount() {
        this.startImageLoad()
    }

    componentDidUpdate(prevProps: IProps) {
        if (this.props.imageSrc === prevProps.imageSrc) {
            return
        }
        this.setState({...this.state, loaded: false});
        this.startImageLoad()
    }

    render() {
        return (
            <div
                className={`responsive-img ${this.state.loaded ? "loaded" : "loading"}`}
                style={this.getImageStyle()}
            >
                {!this.state.loaded && <div className="responsive-image-loading" />}
            </div>
        );
    }

    private getImageStyle = () => {
        return {
            backgroundImage: this.state.loaded ? `url(${this.props.imageSrc})` : "",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: this.props.type ? this.props.type : "contain",
            position: "relative" as "relative",
            height: "100%",
            width: "100%"
        }
    }

    private startImageLoad = () => {
        const image = new Image()
        image.src = this.props.imageSrc
        image.onload = (e: Event) => {
            setTimeout(() => {
                this.setState({...this.state, loaded: true})
            }, 200);
        }
    }
}

export default ResponsiveImage;