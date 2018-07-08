import * as React from 'react'
import './App.css'
import DropDown from "./drop-down"
import ResponsiveImage from "./responsive-image"
import SimpleSlider from "./simple-slider"

interface IState {
  images: string[]
  currentIndex: number
  menuActive: boolean
}

class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      currentIndex: 0,
      images: [
        "https://images.unsplash.com/photo-1527381752380-a1d3cff8808f",
        "https://images.unsplash.com/photo-1528986852326-ce827593c53a",
        "https://images.unsplash.com/photo-1530050860160-1f4c7b2ed417",
        "https://images.unsplash.com/photo-1527381752380-a1d3cff8808f",
        "https://images.unsplash.com/photo-1528986852326-ce827593c53a",
        "https://images.unsplash.com/photo-1530050860160-1f4c7b2ed417",
      ],
      menuActive: false
    }
  }

  public render() {
    return (
      <div className="App">
        <header>
          <h4>Emil Photography</h4>
        </header>
        <div style={{textAlign: "center"}} onClick={this.toggleMenu}>&#8897;</div>
        <div style={{position: "absolute", width: "100%"}}>
          <DropDown active={this.state.menuActive}>
            <SimpleSlider activeItem={this.state.currentIndex}>
              {this.state.images.map(this.renderImageListItem)}
            </SimpleSlider>
          </DropDown>
        </div>
        <div className="content">
          <div onClick={this.prevImage}>&#8810;</div>
          <div style={{height: "100%", width: "90%"}}>
            <ResponsiveImage imageSrc={this.state.images[this.state.currentIndex]}/>
          </div>
          <div onClick={this.nextImage}>&#8811;</div>
        </div>
      </div>
    );
  }

  private renderImageListItem = (src: string, index: number) => {
    return (
      <div key={index} onClick={this.setImageIndex(index)} style={{width: "5rem", height: "5rem", margin: "5px"}}>
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

export default App
