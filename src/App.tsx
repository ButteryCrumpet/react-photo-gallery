import * as React from 'react'
import './App.css'
import { RouteComponentProps, Link } from "react-router-dom"
import ImageGallery from "./image-gallery"
import FullScreen from './components/full-screen';
import { getEmbeddedImages, ImageInfo } from "./images"

type IProps = RouteComponentProps<any>

interface IState {
    menuActive: boolean
    detailsActive: boolean
    dropDownActive: boolean
} 

class App extends React.Component<IProps,IState> {
    private pageTitle = "Emil Wittern"
    private images = getEmbeddedImages()
        

    constructor(props: RouteComponentProps<any>) {
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
        return (
            <FullScreen>
                <header className={this.state.menuActive ? "active" : "inactive"}>
                    <div className="logo">
                        <h4>{this.pageTitle}</h4>
                    </div>
                    <nav>
                    {Object.keys(this.images).map((key, i) => {
                        const isActive = key === category
                        return <Link key={i} to={`/${key}/`}>
                            <h4 className={`nav-link ${isActive ? "active" : ""}`}>
                                {key.charAt(0).toLocaleUpperCase() + key.substr(1)}
                            </h4>
                        </Link>
                    })}
                    </nav>
                    <div className="block">
                        <h4>
                            <a href={this.images[category][activeIndex].src}>Big</a>
                        </h4>
                        <h4 onClick={this.detailsToggle} className={`details-toggle ${this.state.detailsActive ? "active" : "inactive"}`}>
                            {this.state.detailsActive ? "\u00D7" : "𝓲"}
                        </h4>
                        <h4 onClick={this.menuToggle} className="menuToggle">
                            {this.state.menuActive ? "\u00D7" : "\u2630"}
                        </h4>
                    </div>
                </header>
                <ImageGallery
                    active={activeIndex}
                    images={this.images[category]}
                    detailsActive={this.state.detailsActive}
                    dropdownActive={this.state.dropDownActive}
                    onChange={next}
                    toggleDropdown={this.dropDownToggle}/>
            </FullScreen>
        )
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