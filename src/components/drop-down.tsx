import * as React from "react"

interface IProps {
    active: boolean
    children?: any
}

interface IState {
    height: number
}

class DropDown extends React.Component<IProps, IState> {
    private innerStyle = {
        position: "absolute" as "absolute",
        width: "100%",
        heigh: "100%",
        bottom: "0px"
    }

    private heightRef: HTMLElement | null

    constructor(props: IProps) {
        super(props)
        this.state = {
            height: 0
        }
    }

    componentDidMount() {
        if (this.heightRef) {
            this.setState({height: this.heightRef.getBoundingClientRect().height})
        }
    }

    render() {
        return (
            <div style={this.getContainerStyle()}>
                <div ref={ ref => this.heightRef = ref } style={this.innerStyle}>
                {this.props.children}
                </div>
            </div>
        )
    }

    private getContainerStyle = () => {
        const base = {
            position: "relative" as "relative",
            overflow: "hidden",
            transition: "height 0.2s ease-in",
            height: "0px"
        }
        if (this.state.height > 0 && this.props.active) {
            base.height = `${this.state.height}px`
        }
        return base
    }
}

export default DropDown