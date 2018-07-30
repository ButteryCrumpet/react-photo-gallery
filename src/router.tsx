import * as React from 'react'
import { Route, BrowserRouter, Switch } from "react-router-dom"
import App from "./App"

const Router: React.SFC<{}> = (props) => {
    return  <BrowserRouter>
        <Switch>
            <Route exact={true} path="/" component={App}/>
            <Route path="/:cat(portrait|lifestyle|travel|documentary)/:id?" component={App} />
            <Route path="/biography" render={renderBio} />
            <Route render={render404} />
        </Switch>
    </BrowserRouter>
}

const renderBio = () => {
    return <div>Biography</div>
}

const render404 = () => {
    return <div>404</div>
}

export default Router