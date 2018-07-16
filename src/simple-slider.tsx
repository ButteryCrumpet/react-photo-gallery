import * as React from "react"
import TouchMove from "./touch-moveable"

interface IState {
    widths: number[]
    windowWidth: number
    fullWidth: number
    scrolled: number
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
            windowWidth: 0,
            fullWidth: 0,
            scrolled: 0
        }
    }

    public componentWillReceiveProps() {
        this.setState({...this.setState, scrolled: 0})
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
            transform: `translateX(${this.toTranslate()}px)`,
            transition: this.shouldAnimate() ? "transform 0.3s linear" : ""
        }
        this.enableAnimation()
        return (
            <TouchMove onMove={this.handleTouchMove}>
            <div ref={ ref => this.windowRef = ref } className="ss-window" style={this.windowStyle}>
                <div className="ss-slide" style={slideStyle}>
                    {React.Children.map(
                        this.props.children,
                        (e, i) =>
                            <div ref={this.itemRefs[i]} className={this.getClassName(i)} key={i} style={this.slideItemStyle}>
                                {e}
                            </div>
                        )}
                </div>
            </div>
            </TouchMove>
        )
    }

    private updateWidths = () => {
        const { widths, fullWidth } = this.getWidths()
        const windowWidth = this.getWindowWidth()
        this.setState({ widths: widths, windowWidth: windowWidth, fullWidth: fullWidth })
    }

    private getWidths = () => {
        return this.itemRefs.reduce((widths, e) => {
            const width = this.getWidth(e.current)
            return { widths: [...widths.widths, width], fullWidth: widths.fullWidth + width }
        },{widths: [], fullWidth: 0})
    }

    private getWindowWidth = () => {
        if (!this.windowRef) {
            return 0
        }
        return this.windowRef.getBoundingClientRect().width
    }

    private getWidth = (e: HTMLDivElement | null) => {
        if (!e) {
            return 0
        }
        return e.getBoundingClientRect().width
    }

    private getDistanceToActive = () => {
        if (!this.state) {
            return 0
        }
        const active = this.props.activeItem
        const distanceToActive = this.state.widths
            .filter((_v, i) => i <= active)
            .reduce((p, c, i) => i === active ? p + c/2 : p + c, 0)

        const halfWindowWidth = this.state.windowWidth / 2
        if (distanceToActive < halfWindowWidth) {
            return 0
        }
        if (distanceToActive > (this.state.fullWidth - halfWindowWidth)) {
            return - (this.state.fullWidth - this.state.windowWidth)
        }
        return - (distanceToActive - halfWindowWidth)
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

    private getClassName = (i: number) => {
        if (i === this.props.activeItem) {
            return "ss-active"
        }
        if (i === this.props.activeItem - 1) {
            return "ss-previous"
        }
        if (i === this.props.activeItem + 1) {
            return "ss-next"
        }
        return ""
    }

    private handleTouchMove = (moveState: any) => {
        if (moveState.moves.length < 2) {
            return
        }
        const distance = moveState.current.x - moveState.moves[moveState.moves.length - 2].x
        const scrolled = this.state.scrolled + distance     
        this.disableAnimation()
        this.setState({ ...this.setState, scrolled: scrolled })
    }

    private toTranslate = () => {
        const distanceToActive = this.getDistanceToActive()
        const toScroll = distanceToActive + this.state.scrolled
        const rightLimit = - (this.state.fullWidth - this.state.windowWidth)
        const leftLimit = 0
        if (toScroll > leftLimit) {
            return leftLimit
        }
        if (toScroll < rightLimit) {
            return rightLimit 
        }
        return toScroll

    }
}

export default SimpleSlider
