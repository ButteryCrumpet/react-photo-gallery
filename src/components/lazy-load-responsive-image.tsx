import * as React from "react"
import ResponsiveImage from "./responsive-image";

interface IProps {
    imageSrc: string
    type?: "contain" | "cover"
}

interface IState {
    loaded: boolean
}

class LazyLoadResponsiveImage extends React.Component<IProps,IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            loaded: false
        }
    }

    public componentDidMount() {
        this.load()
    }

    public componentDidUpdate(prev: IProps) {
        if (this.props.imageSrc === prev.imageSrc) {
            return
        }
        this.load()
    }

    public render() {
        return (
            this.state.loaded
                ? <ResponsiveImage {...this.props} />
                : <div className="responsive-image-loading" />
        )
    }

    private load = () => {
        const image = new Image()
        image.onload = () => {
            this.setState({...this.state, loaded: true})
        }
        if (!image.complete) {
            if (this.state.loaded) {
                this.setState({...this.state, loaded: false})
            }
        }
        image.src = this.props.imageSrc
    }
}

export default LazyLoadResponsiveImage