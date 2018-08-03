import * as React from "react"

interface IState {
  height: number
}

class FullScreen extends React.Component <{}, IState> {

  constructor(props: {}) {
    super(props)
    this.state = {
      height: window.innerHeight
    }
    window.addEventListener("resize", this.updateHeight)
  }

  render() {
    const style = {
      height: this.state.height,
      maxHeight: this.state.height,
      overflow: "hidden",
      position: "fixed" as "fixed",
      top: "0px",
      left: "0px",
      width: "100%"
    }
    return (
      <div style={style}>
        {this.props.children}
      </div>
    )
  }

  private updateHeight = () => {
    this.setState({height: window.innerHeight})
  }
}

export default FullScreen