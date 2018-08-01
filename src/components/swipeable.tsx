import * as React from "react"

interface IProps {
  swipeL ? : Function
  swipeR ? : Function
  swipeU ? : Function
  swipeD ? : Function
  buffer ? : number
}

class Swipable extends React.Component < IProps > {
  private startCoords: {x: number, y: number}
  private cancelled = false

  constructor(props: IProps) {
    super(props)
    this.startCoords
    this.cancelled
  }

  render() {
    return ( 
      <div
        className="swipable"
        style={{touchAction:"none"}}
        onTouchStart={this.handleStart}
        onTouchEnd={this.handleEnd}
        onTouchCancel={this.cancel}
      >
        {this.props.children}
      </div>
    )
  }

  private handleStart = (e: React.TouchEvent) => {
    const x = e.changedTouches[0].clientX
    const y = e.changedTouches[0].clientY
    this.startCoords = {x: x, y: y}
  }

  private cancel = () => {
    this.cancelled = true
  }

  private handleEnd = (e: React.TouchEvent) => {
    if (this.cancelled) {
      this.cancelled = false
      return
    }
    this.handleX(this.startCoords.x - e.changedTouches[0].clientX)
    this.handleY(this.startCoords.y - e.changedTouches[0].clientY)
  }

  private handleX = (num: number) => {
    if (!this.enough(num)) {
      return
    }
    if (num > 0 && this.props.swipeL) {
      this.props.swipeL()
    }
    if (num <0 && this.props.swipeR) {
      this.props.swipeR()
    }
  }

  private handleY = (num: number) => {
    if (!this.enough(num)) {
      return
    }
    if (num > 0 && this.props.swipeU) {
      this.props.swipeU()
    }
    if (num <0 && this.props.swipeD) {
      this.props.swipeD()
    }
  }

  private enough = (num: number) => {
    const buffer = this.props.buffer || 100
    return Math.abs(num) >= buffer
  }
}

export default Swipable