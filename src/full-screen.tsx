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
    return (
      <div style={{maxHeight: this.state.height, overflow: "hidden"}}>
        {this.props.children}
      </div>
    )
  }

  private updateHeight = () => {
    this.setState({height: window.innerHeight})
  }
}

export default FullScreen