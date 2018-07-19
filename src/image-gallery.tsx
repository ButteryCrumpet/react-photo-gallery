import * as React from 'react'
import './App.css'
import DropDown from "./drop-down"
import ResponsiveImage from "./responsive-image"
import SimpleSlider from "./simple-slider"
import Swipable from "./swipeable"
import FullScreen from "./full-screen"

interface IState {
  images: string[]
  currentIndex: number
  menuActive: boolean
}

interface IProps {
  match: {params: {id?: string}}
}

class ImageGallery extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props)
    console.log(this.props)
    this.state = {
      currentIndex: parseInt(this.props.match.params.id || "0") || 0,
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
    console.log(this.state)
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
            <SimpleSlider activeItem={this.state.currentIndex}>
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
              <ResponsiveImage imageSrc={this.state.images[this.state.currentIndex]}/>
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
      <div key={index} onClick={this.setImageIndex(index)} style={{width: "4rem", height: "4rem", margin: "2px"}}>
        <ResponsiveImage imageSrc={src} type="cover"/>
      </div>
    )
  }

  private nextImage = () => {
    const next = this.state.currentIndex + 1 >= this.state.images.length
      ? 0
      : this.state.currentIndex + 1;
    this.setState({...this.setState, currentIndex: next});
  }

  private prevImage = () => {
    const next = this.state.currentIndex - 1 < 0
      ? this.state.images.length - 1
      : this.state.currentIndex - 1;
    this.setState({...this.setState, currentIndex: next});
  }
  
  private setImageIndex = (i: number) => () => {
    this.setState({...this.state, currentIndex: i})
  }

  private toggleMenu = () => {
    this.setState({...this.state, menuActive: !this.state.menuActive})
  }
}

export default ImageGallery
