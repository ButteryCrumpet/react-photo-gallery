import * as React from "react"
import { CSSTransition } from "react-transition-group"
import ResponsiveImage from "./responsive-image"

interface IProps {
    src: string
}

interface IState {
    transitioning: boolean
    loaded: boolean
}

class Carousel extends React.Component<IProps,IState> {

    private prev: string
    
    constructor(props: IProps) {
        super(props)
        this.state = {
            transitioning: false,
            loaded: false
        }
    }

    public componentDidMount() {
        this.load(true);
    }

    public componentDidUpdate(prev: IProps) {
        if (prev.src !== this.props.src) {
          this.load(false)
        }
        this.prev = prev.src
    }

    public render() {
        const src = this.state.transitioning
            ? this.prev
            : this.props.src
        return (
            <div className="carousel">
                <CSSTransition
                    appear={true}
                    in={!this.state.transitioning && this.state.loaded}
                    onExited={this.setNotTransitioning}
                    classNames="fade"
                    timeout={200}>
                    <ResponsiveImage imageSrc={src} />
                </CSSTransition>
                {!this.state.loaded && <div className="responsive-image-loading" />}
            </div>
        )
    }

    private setNotTransitioning = () => {
        this.setState({...this.state, transitioning: false})
    }

    private load = (init: boolean) => {
        const image = new Image()
        image.onload = () => {
            if (!this.state.loaded) {
                this.setState({...this.state, loaded: true})
            }
        }
        image.src = this.props.src
        this.setState({
            ...this.state,
            transitioning: !init,
            loaded: image.complete ? true : false
        })
    }
}

export default Carousel