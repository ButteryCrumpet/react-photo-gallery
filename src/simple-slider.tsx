import * as React from "react"

interface IState {
    widths: number[]
}

interface IProps {
    activeItem: number
}

class SimpleSlider extends React.Component<IProps, IState> {
    private itemRefs: React.RefObject<HTMLDivElement>[]

    constructor(props: any) {
        super(props)
        this.itemRefs = React.Children.map(this.props.children, (e, i) => React.createRef())
    }

    public componentDidMount() {
        const widths = this.itemRefs.map((e, i) => this.getWidth(e.current))
        this.setState({widths: widths})
    }

    public render() {
        return (
            <div className="ss-window" style={{width: "100%", overflow: "hidden"}}>
                <div className="ss-slide" style={{whiteSpace: "nowrap", transform: `translateX(-${this.getDistanceToActive()}px)`, transition: "transform 0.3s linear"}}>
                    {React.Children.map(this.props.children, (e, i) => <div ref={this.itemRefs[i]} key={i} style={{display: "inline-block", boxSizing: "border-box"}}>{e}</div>)}
                </div>
            </div>
        )
    }

    private getDistanceToActive = () => {
        if (!this.state) {
            return 0
        }

        const d = this.state.widths.filter((e, i) => i < this.props.activeItem).reduce((p, c) => p + c, 0)
        console.log(this.props.activeItem)
        console.log(d)
        return d
    }

    private getWidth = (e: HTMLDivElement | null) => {
        if (!e) {
            return 0
        }
        return e.getBoundingClientRect().width
    }
}

export default SimpleSlider
