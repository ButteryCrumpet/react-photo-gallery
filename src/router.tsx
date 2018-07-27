import * as React from 'react'
import { Route, HashRouter } from "react-router-dom"
import App from "./App"

const Router: React.SFC<{}> = (props) => {
    return  <HashRouter>
        <Route path="/:cat?/:id?" component={App} />
    </HashRouter>
}

export default Router