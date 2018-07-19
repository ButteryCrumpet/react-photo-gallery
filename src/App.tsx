import * as React from 'react'
import { Route, HashRouter } from "react-router-dom"
import ImageGallery from "./image-gallery"

class App extends React.Component<{},{}> {
    constructor(props: {}) {
        super(props)
    }

    render() {
        return (
            <HashRouter >
                <div>
                    <Route path="/" component={ImageGallery} />
                    <Route path="/:id" component={ImageGallery} />
                </div>
            </HashRouter>
        )
    }
}

export default App