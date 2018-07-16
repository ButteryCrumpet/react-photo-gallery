import * as React from "react"

interface Coordinates {
  x: number
  y: number
}

interface IProps {
  onMove: Function
  onStart?: Function
  onEnd?: Function
}

interface IState {
  start: Coordinates
  current: Coordinates
  moves: ReadonlyArray<Coordinates>
}

class TouchMoveable extends React.Component <IProps> {
  private internalState: IState = {
    start: {x: 0, y: 0},
    current: {x: 0, y: 0},
    moves: []
  }
  constructor(props: IProps) {
    super(props)
  }

  public render() {
    return ( 
      <div onTouchStart={this.handleStart}
        onTouchMove={this.handleMove}
        onTouchEnd={this.handleEnd}
      >
        {this.props.children}
      </div>
    )
  }

  private handleStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const start = {x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY}
    this.internalState = {
      start: start,
      current: start,
      moves: [start]
    }
    if (this.props.onStart) {
      this.props.onStart(this.internalState)
    }
  }

  private handleMove = (e: React.TouchEvent) => {
    const touch = e.changedTouches[e.changedTouches.length - 1]
    const current = {x: touch.clientX, y: touch.clientY}
    const eDist  = this.manhattanDist(this.internalState.current, current)
    if (2 > eDist && eDist  > -2) {
      return
    }
    
    this.internalState = {
      start: this.internalState.start,
      current: current,
      moves: [...this.internalState.moves, current]
    }
    this.props.onMove(this.internalState)
  }

  private handleEnd = (e: React.TouchEvent) => {
    if (this.props.onEnd) {
      this.props.onEnd(this.internalState)
    }
    this.internalState = {
      start: {x: 0, y: 0},
      current: {x: 0, y: 0},
      moves: []
    }
  }

  private manhattanDist = (px: Coordinates, py: Coordinates) => {
    return (px.x - py.x) + (px.y - py.y)
  }
}

export default TouchMoveable