import * as React from 'react'
import './App.css'
import DropDown from "./drop-down"
import ResponsiveImage from "./responsive-image"
import SimpleSlider from "./simple-slider"
import Swipable from "./swipeable"
import FullScreen from "./full-screen"
import { RouteComponentProps, Link } from "react-router-dom"

interface IState {
  images: string[]
  menuActive: boolean
}

class ImageGallery extends React.Component<RouteComponentProps<any>, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      images: [
        "https://images.unsplash.com/photo-1527381752380-a1d3cff8808f",
        "https://images.unsplash.com/photo-1528986852326-ce827593c53a",
        "https://images.unsplash.com/photo-1530050860160-1f4c7b2ed417",
        "https://images.unsplash.com/photo-1527381752380-a1d3cff8808f",
        "https://images.unsplash.com/photo-1528986852326-ce827593c53a",
        "https://images.unsplash.com/photo-1530050860160-1f4c7b2ed417",
        "https://images.unsplash.com/photo-1527381752380-a1d3cff8808f",
        "https://images.unsplash.com/photo-1528986852326-ce827593c53a",
        "https://images.unsplash.com/photo-1530050860160-1f4c7b2ed417",
        "https://images.unsplash.com/photo-1527381752380-a1d3cff8808f",
        "https://images.unsplash.com/photo-1528986852326-ce827593c53a",
        "https://images.unsplash.com/photo-1530050860160-1f4c7b2ed417",
        "https://images.unsplash.com/photo-1527381752380-a1d3cff8808f",
        "https://images.unsplash.com/photo-1528986852326-ce827593c53a",
        "https://images.unsplash.com/photo-1530050860160-1f4c7b2ed417",
        "https://images.unsplash.com/photo-1527381752380-a1d3cff8808f",
        "https://images.unsplash.com/photo-1528986852326-ce827593c53a",
        "https://images.unsplash.com/photo-1530050860160-1f4c7b2ed417",
        "https://images.unsplash.com/photo-1527381752380-a1d3cff8808f",
        "https://images.unsplash.com/photo-1528986852326-ce827593c53a",
        "https://images.unsplash.com/photo-1530050860160-1f4c7b2ed417",
        "https://images.unsplash.com/photo-1527381752380-a1d3cff8808f",
        "https://images.unsplash.com/photo-1528986852326-ce827593c53a",
        "https://images.unsplash.com/photo-1530050860160-1f4c7b2ed417",
      ],
      menuActive: true
    }
  }
  // list parent categories -> child category list dropdown -> click -> load images
  // routing 
  public render() {
    return (
      <FullScreen>
        <header className="header">
          <h4>Photography</h4>
        </header>

        <div style={{zIndex: 1000 ,position: "absolute", width: "100%", backgroundColor:"white"}}>
          <DropDown active={this.state.menuActive}>
            <SimpleSlider activeItem={this.currentIndex()}>
              {this.state.images.map(this.renderImageListItem)}
            </SimpleSlider>
          </DropDown>
          <div style={{display:"flex",justifyContent:"center",cursor:"pointer"}} onClick={this.toggleMenu}>
            <div style={{fontSize: "1em"}}>
              {
                this.state.menuActive
                  ? (<strong>&#8743;</strong>)
                  : (<strong>&#8744;</strong>)
              }
            </div>
          </div>
        </div>

        <Swipable swipeL={this.nextImage} swipeR={this.prevImage}>
          <div className="content">
            <div style={{height: "100%", width: "95%"}}>
              <ResponsiveImage imageSrc={this.state.images[this.currentIndex()]}/>
            </div>
            <div style={{position:"absolute",top:"50%",cursor:"pointer",left:"1rem",fontSize:"1.5rem"}} onClick={this.prevImage}>&#8810;</div>
            <div style={{position:"absolute",top:"50%",cursor:"pointer",right:"1rem",fontSize:"1.5rem"}} onClick={this.nextImage}>&#8811;</div>
          </div>
        </Swipable>

      </FullScreen>
    );
  }

  private renderImageListItem = (src: string, index: number) => {
    return (
      <div key={index} style={{width: "4rem", height: "4rem", margin: "2px"}}>
        <Link to={`/${index}`}>
          <ResponsiveImage imageSrc={src} type="cover"/>
        </Link>
      </div>
    )
  }

  private nextImage = () => {
    
  }

  private prevImage = () => {
    
  }

  private toggleMenu = () => {
    this.setState({...this.state, menuActive: !this.state.menuActive})
  }

  private currentIndex = () => {
    return parseInt(this.props.match.params.id || "0") || 0 
  }
}

export default ImageGallery
