import * as React from 'react'
import { Route, HashRouter, RouteComponentProps, Link } from "react-router-dom"
import ImageGallery from "./image-gallery"
import FullScreen from './full-screen';

class App extends React.Component<{},{}> {
    private images = {
        people: [
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
        nature: [
            "https://images.unsplash.com/photo-1528986852326-ce827593c53a",
            "https://images.unsplash.com/photo-1527381752380-a1d3cff8808f",
            "https://images.unsplash.com/photo-1530050860160-1f4c7b2ed417",
            "https://images.unsplash.com/photo-1527381752380-a1d3cff8808f",
            "https://images.unsplash.com/photo-1530050860160-1f4c7b2ed417",
            "https://images.unsplash.com/photo-1527381752380-a1d3cff8808f",
            "https://images.unsplash.com/photo-1528986852326-ce827593c53a",
        ]
    };

    constructor(props: {}) {
        super(props)
    }

    private makeImageGallery = (props: RouteComponentProps<any>) => {
        const active = props.match.params.id ? parseInt(props.match.params.id) : 0
        const category = props.match.params.cat ? props.match.params.cat : "people"
        const change = (active: number) => props.history.push(`/${category}/${active}`)
        return <ImageGallery active={active} images={this.images[category]} onChange={change} />
    }
    // state injector for gallery?
    // loading while getting new images
    // category change -> new images
    // image caption!
    render() {
        return (
            <HashRouter>
                <FullScreen>
                    <header className="header">
                        <h4>Photography</h4>
                        <div className="nav">
                        <h4>|</h4>
                        {Object.keys(this.images).map((key, i) =>{
                            return <Link key={i} to={`/${key}/0`}>
                                <h4 className="nav-link">{key.charAt(0).toLocaleUpperCase() + key.substr(1)}</h4>
                            </Link>
                        })}
                        </div>
                    </header>
                    <Route exact={true} path="/" render={this.makeImageGallery} />
                    <Route path="/:cat/:id" render={this.makeImageGallery} />
                </FullScreen>
            </HashRouter>
        )
    }
}

export default App