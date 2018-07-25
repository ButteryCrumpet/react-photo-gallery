import * as React from 'react'
import './App.css'
import DropDown from "./drop-down"
import ResponsiveImage from "./responsive-image"
import SimpleSlider from "./simple-slider"
import Swipable from "./swipeable"

interface IState {
  menuActive: boolean
  detailsActive: boolean
}

interface IProps {
  active: number
  images: string[]
  onChange: (active: number) => void
}

class ImageGallery extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props)
    this.state = {
      menuActive: false,
      detailsActive: false
    }
    document.addEventListener("keypress", this.handleKeyPress)
  }
  
  public render() {
    return (
      <div className="ig-gallery">
        <div className="ig-dropdown" >
          <DropDown active={this.state.menuActive}>
            <SimpleSlider activeItem={this.props.active}>
              {this.props.images.map(this.renderImageListItem)}
            </SimpleSlider>
          </DropDown>
          <div className="ig-dropdown-control" onClick={this.toggleMenu}>
            <div>
              {this.state.menuActive ? "\u2227" : "\u2228"}
            </div>
          </div>
        </div>

        <Swipable swipeL={this.next} swipeR={this.prev} >
          <div className="ig-main">
            <div className="ig-main-image" style={{height: "100%", width: "95%"}}>
              <ResponsiveImage imageSrc={this.props.images[this.props.active]}/>
            </div>
            <div onClick={this.prev} className="ig-prev">
              &#8810;
            </div>
            <div onClick={this.next} className="ig-next">
              &#8811;
            </div>
            <div className={`details ${this.state.detailsActive ? "active" : "inactive"}`}>
                <p>Title</p>
                <p>Some short description</p>
                <small>2018/05/12</small>
            </div>
            <div onClick={this.toggleDetails} className={`details-toggle ${this.state.detailsActive ? "active" : "inactive"}`}>
                {this.state.detailsActive ? "x" : "i"}
            </div>
          </div>
        </Swipable>
      </div>
    );
  }

  private renderImageListItem = (src: string, index: number) => {
    return (
      <div className="ig-thumbnail" onClick={this.bufferedSetActive(index)} key={index} >
          <ResponsiveImage imageSrc={src} type="cover"/>
      </div>
    )
  }

  private bufferedSetActive = (i: number) => () => {
    this.setActive(i)
  }

  private setActive = (i: number) => {
    const next = i < 0
      ? this.props.images.length - 1
      : i > this.props.images.length - 1
          ? 0
          : i
    this.props.onChange(next)
  }

  private next = () => {
    this.setActive(this.props.active + 1)
  }

  private prev = () => {
    this.setActive(this.props.active - 1)
  }

  private toggleMenu = () => {
    this.setState({...this.state, menuActive: !this.state.menuActive})
  }

  private toggleDetails = () => {
    this.setState({...this.state, detailsActive: !this.state.detailsActive})
  }

  private handleKeyPress = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
        this.next()
        break
      case "ArrowLeft":
        this.prev()
        break
      case " ":
        this.toggleMenu()
        break
      default:
        break
    }
  }
}

export default ImageGallery
