import * as React from 'react'

import DropDown from "./drop-down"
import ResponsiveImage from "./responsive-image"
import SimpleSlider from "./simple-slider"
import Swipable from "./swipeable"
import Carousel from './carousel'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"

import { ImageInfo } from "../helpers/images"

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
            {props.dropdownActive
              ? <FontAwesomeIcon icon={faChevronUp} />
              : <FontAwesomeIcon icon={faChevronDown} />}
          </div>
        </div>
      </div>

      <Swipable swipeL={next} swipeR={prev}>
        <div className="ig-main"> 
          <Carousel src={image.src} />
          <div onClick={prev} className="ig-prev">
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <div onClick={next} className="ig-next">
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
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
