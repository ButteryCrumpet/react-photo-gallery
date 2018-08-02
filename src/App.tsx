import * as React from 'react'
import { RouteComponentProps } from "react-router-dom"
import { FacebookShareButton, TwitterShareButton } from "react-share"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faBars, faTimes, faInfo, faExpand } from "@fortawesome/free-solid-svg-icons"
import ImageGallery from "./components/image-gallery"
import FullScreen from './components/full-screen';
import { getEmbeddedImages, ImageInfo } from "./helpers/images"
import Header from "./components/header"

interface IProps extends RouteComponentProps<any> {
    page: "gallery" | "contact" | "biography"
}

interface IState {
    menuActive: boolean
    detailsActive: boolean
    dropDownActive: boolean
} 

class App extends React.Component<IProps,IState> {
    private pageTitle = "Emil Wittern"
    private images = getEmbeddedImages()
    private links = {
        portrait: "/portrait",
        lifestyle: "/lifestyle",
        travel: "/travel",
        documentary: "/documentary",
        contact: "/contact",
        biography: "/biography"
    }
        

    constructor(props: IProps) {
        super(props)
        this.state = {
            menuActive: false,
            detailsActive: false,
            dropDownActive: false
        }
    }

    public componentDidUpdate(prev: IProps) {
        if (prev.location.pathname === this.props.location.pathname) {
            return
        }
        this.setState({...this.state, menuActive: false})
    }

    public render() {
        const category = this.getCategory()
        const activeIndex = this.getActiveIndex(category)
        const next = this.buildNext(category)
        const current = this.props.page === "gallery" ? category : this.props.page
        return (
            <FullScreen>
                <Header 
                    active={this.state.menuActive}
                    current={current}
                    logo={<h4>{this.pageTitle}</h4>}
                    links={this.links}>
                    {this.renderAdditional(this.images[category][activeIndex].src)}
                </Header>
                {this.props.page === "gallery" &&
                <h4 onClick={this.detailsToggle} className={`details-toggle ${this.state.detailsActive ? "active" : "inactive"}`}>
                    {this.state.detailsActive
                        ? <FontAwesomeIcon icon={faTimes} />
                        : <FontAwesomeIcon icon={faInfo} />}
                </h4>
                }
                {this.props.page === "gallery" && <ImageGallery
                    active={activeIndex}
                    images={this.images[category]}
                    detailsActive={this.state.detailsActive}
                    dropdownActive={this.state.dropDownActive}
                    onChange={next}
                    toggleDropdown={this.dropDownToggle}/>}
                {this.props.page === "contact" && <div>Contact</div>}
                {this.props.page === "biography" && <div>Biography</div>}
            </FullScreen>
        )
    }

    private renderAdditional = (imageUrl: string) => {
        return <div className="block">
            <h4>
                <a href={imageUrl}>
                    <FontAwesomeIcon icon={faExpand} />
                </a>
            </h4>
            <h4>
                <FacebookShareButton url={window.location.href}>
                    <FontAwesomeIcon icon={faFacebook} />
                </FacebookShareButton>
            </h4>
            <h4>
                <TwitterShareButton url={window.location.href}>
                    <FontAwesomeIcon icon={faTwitter} />
                </TwitterShareButton>
            </h4>
            <h4 onClick={this.menuToggle} className="menuToggle">
                {this.state.menuActive
                    ? <FontAwesomeIcon icon={faTimes} />
                    : <FontAwesomeIcon icon={faBars} />}
            </h4>
        </div>
    }

    private getCategory = () => {
        const category = this.props.match.params.cat ? this.props.match.params.cat : ""
        if (category === "") {
            return Object.keys(this.images)[0]
        }
        if (!this.images.hasOwnProperty(category)) {
            return Object.keys(this.images)[0]
        }
        return category
    }

    private getActiveIndex = (category: string) => {
        const active = this.props.match.params.id
            ? parseInt(this.props.match.params.id)
            : 0
        return this.images[category].reduce((acc: number, curr: ImageInfo, i) => {
            if (curr.id === active) {
                return i
            }
            return acc
        }, 0)
    }

    private buildNext = (category: string) => (newActiveIndex: number) => {
        const next = this.images[category][newActiveIndex].id
        this.props.history.push(`/${category}/${next}`)
    }

    private dropDownToggle = () => {
        this.setState({...this.state, dropDownActive: !this.state.dropDownActive})
    }

    private detailsToggle = () => {
        this.setState({...this.state, detailsActive: !this.state.detailsActive})
    }

    private menuToggle = () => {
        this.setState({...this.state, menuActive: !this.state.menuActive})
    }
}

export default App