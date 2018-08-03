import * as React from 'react'
import { RouteComponentProps } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faTimes, faInfo, faExternalLinkAlt, faShareAlt } from "@fortawesome/free-solid-svg-icons"
import ImageGallery from "./components/image-gallery"
import FullScreen from './components/full-screen';
import { getEmbeddedImages, ImageInfo } from "./helpers/images"
import Header from "./components/header"
import SharePanel from './components/sharePanel';

interface IProps extends RouteComponentProps<any> {
    page: "gallery" | "contact" | "biography"
}

interface IState {
    menuActive: boolean
    detailsActive: boolean
    dropDownActive: boolean
    shareActive: boolean
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
    private falseState = {
        menuActive: false,
        detailsActive: false,
        dropDownActive: false,
        shareActive: false
    }
        

    constructor(props: IProps) {
        super(props)
        this.state = this.falseState
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
                    <h4 onClick={this.menuToggle} className="menuToggle">
                        {this.state.menuActive
                            ? <FontAwesomeIcon icon={faTimes} />
                            : <FontAwesomeIcon icon={faBars} />}
                    </h4>
                </Header>
                <CSSTransition
                    in={this.state.shareActive}
                    classNames="fade"
                    unmountOnExit={true}
                    timeout={200}>
                    <SharePanel />
                </CSSTransition>
                {this.props.page === "gallery" &&
                <div className="side">
                    <h4 onClick={this.detailsToggle} className={`details-toggle ${this.state.detailsActive ? "active" : "inactive"}`}>
                        {this.state.detailsActive
                            ? <FontAwesomeIcon icon={faTimes} />
                            : <FontAwesomeIcon icon={faInfo} />}
                    </h4>
                    <h4 onClick={this.shareToggle}>
                        <FontAwesomeIcon icon={faShareAlt} />
                    </h4>
                    <h4>
                        <a href={this.images[category][activeIndex].src}>
                            <FontAwesomeIcon icon={faExternalLinkAlt} />
                        </a>
                    </h4>
                </div>}
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

    private getCategory = () => {
        const category = this.props.match.params.cat ? this.props.match.params.cat : ""
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
        this.setState({...this.falseState, dropDownActive: !this.state.dropDownActive})
    }

    private detailsToggle = () => {
        this.setState({...this.falseState, detailsActive: !this.state.detailsActive})
    }

    private menuToggle = () => {
        this.setState({...this.falseState, menuActive: !this.state.menuActive})
    }

    private shareToggle = () => {
        this.setState({...this.falseState, shareActive: !this.state.shareActive})
    }
}

export default App