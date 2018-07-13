import * as React from "react"

interface IState {
    widths: number[]
    windowWidth: number
}

interface IProps {
    activeItem: number
}

class SimpleSlider extends React.Component<IProps, IState> {
    private animate = true;
    private itemRefs: React.RefObject<HTMLDivElement>[]
    private windowRef: HTMLDivElement | null
    private windowStyle = {
        overflow: "hidden"
    }
    private slideItemStyle = {
        display: "inline-block",
        boxSizing: "border-box" as "border-box"
    }

    constructor(props: any) {
        super(props)
        this.itemRefs = React.Children.map(this.props.children, (e, i) => React.createRef())
        this.state = {
            widths: [],
            windowWidth: 0
        }
    }

    public componentDidMount() {
        this.updateWidths()
        window.addEventListener('resize', () => {
            this.disableAnimation()
            this.updateWidths()
        })
    }

    public render() {
        const slideStyle = {
            whiteSpace: "nowrap" as "nowrap",
            transform: `translateX(${this.getDistanceToActive()}px)`,
            transition: this.shouldAnimate() ? "transform 0.3s linear" : ""
        }
        this.enableAnimation()
        return (
            <div ref={ ref => this.windowRef = ref } className="ss-window" style={this.windowStyle}>
                <div className="ss-slide" style={slideStyle}>
                    {React.Children.map(
                        this.props.children,
                        (e, i) =>
                            <div ref={this.itemRefs[i]} key={i} style={this.slideItemStyle}>
                                {e}
                            </div>
                        )}
                </div>
            </div>
        )
    }

    private updateWidths = () => {
        const widths = this.itemRefs.map((e) => this.getWidth(e.current))
        const windowWidth = this.getWindowWidth()
        this.setState({widths: widths, windowWidth: windowWidth})
    }

    private getWindowWidth = () => {
        if (!this.windowRef) {
            return 0
        }
        return this.windowRef.getBoundingClientRect().width
    }

    private getDistanceToActive = () => {
        if (!this.state) {
            return 0
        }
        const active = this.props.activeItem
        const distFromBeginning = this.state.widths
            .filter((_e, i) => i <= active)
            .reduce((p, c, i) => active === i ? p + (c/2) : p + c, 0)
        return + (this.state.windowWidth / 2) - distFromBeginning 
    }

    private getWidth = (e: HTMLDivElement | null) => {
        if (!e) {
            return 0
        }
        return e.getBoundingClientRect().width
    }

    private disableAnimation = () => {
        this.animate = false
    }

    private enableAnimation = () => {
        this.animate = true
    }

    private shouldAnimate = () => {
        return this.animate
    }
}

export default SimpleSlider
