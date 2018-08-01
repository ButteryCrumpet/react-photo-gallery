import * as React from 'react'

import DropDown from "./components/drop-down"
import ResponsiveImage from "./components/responsive-image"
import SimpleSlider from "./components/simple-slider"
import Swipable from "./components/swipeable"
import Carousel from './components/carousel';

import { ImageInfo } from "./images"

interface IProps {
  active: number
  images: ImageInfo[]
  detailsActive: boolean
  dropdownActive: boolean
  onChange: (index: number) => any
  toggleDropdown: () => any
}

const ImageGallery: React.SFC<IProps> = (props) => {

  const image = props.images[props.active]
  const bounded = bounds(props.images.length - 1)
  const next = () => props.onChange(bounded(props.active + 1))
  const prev = () => props.onChange(bounded(props.active - 1))
  const setActive = (i: number) => () => props.onChange(bounded(i))
  return (
    <div className="ig-gallery">
      <div className="ig-dropdown" >
        <DropDown active={props.dropdownActive}>
          <SimpleSlider activeItem={props.active}>
            {props.images.map(renderImageListItem(setActive))}
          </SimpleSlider>
        </DropDown>
        <div className="ig-dropdown-control" onClick={props.toggleDropdown}>
          <div>
            {props.dropdownActive ? "\u2227" : "\u2228"}
          </div>
        </div>
      </div>

      <Swipable swipeL={next} swipeR={prev}>
        <div className="ig-main"> 
          <Carousel src={image.src} />
          <div onClick={prev} className="ig-prev">&#8810;</div>
          <div onClick={next} className="ig-next">&#8811;</div>
          <div className={`details ${props.detailsActive ? "active" : "inactive"}`}>
              <h4>{image.title}</h4>
              <p>{image.description}</p>
              <small>{image.date}</small>
          </div>
        </div>
      </Swipable>
    </div>
  );
}

const renderImageListItem = (func: (i: number) => any) => (image: ImageInfo, index: number) => {
  return (
    <div className="ig-thumbnail" onClick={func(index)} key={index} >
        <ResponsiveImage imageSrc={image.thumbnail} type="cover"/>
    </div>
  )
}

const bounds = (max: number) => (i: number) => {
  if (i < 0) {
    return max
  }
  if (i > max) {
    return 0
  }
  return i
}

export default ImageGallery
