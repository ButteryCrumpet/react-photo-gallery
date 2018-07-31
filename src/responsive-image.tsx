import *  as React from "react"

interface IProps {
    imageSrc: string
    type?: "contain" | "cover"
}

interface IState {
    loading: boolean;
}


class ResponsiveImage extends React.Component<IProps, IState> {
    
    constructor(props: IProps) {
        super(props)
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        this.startImageLoad()
    }

    componentDidUpdate(prevProps: IProps) {
        if (this.props.imageSrc === prevProps.imageSrc) {
            return
        }
        this.startImageLoad()
    }

    render() {
        return (
            <div
                className={`responsive-image ${this.state.loading ? "loading" : ""}`}
                style={this.getImageStyle()}
            >
                {this.state.loading && <div className="responsive-image-loading" />}
                {this.props.children}
            </div>
        );
    }

    private getImageStyle = () => {
        return {
            backgroundImage: this.state.loading ? "" : `url(${this.props.imageSrc})`,
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
        if (!image.complete) {
            this.setState({...this.state, loading: true})
            image.onload = (e: Event) => {
                this.setState({...this.state, loading: false})
            }
        }
    }
}

export default ResponsiveImage;