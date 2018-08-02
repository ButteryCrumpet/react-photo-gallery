import * as React from 'react'
import './App.css'
import { Route, BrowserRouter, Switch, RouteComponentProps } from "react-router-dom"
import App from "./App"

const Router: React.SFC<{}> = (props) => {
    return  <BrowserRouter>
        <Switch>
            <Route exact={true} path="/" render={gallery}/>
            <Route path="/:cat(portrait|lifestyle|travel|documentary)/:id?" render={gallery} />
            <Route path="/biography" render={bio} />
            <Route path="/contact" render={contact} />
            <Route render={fourohfour} />
        </Switch>
    </BrowserRouter>
}

const gallery = (props: RouteComponentProps<any>) => {
    return <App page="gallery" {...props} />
}

const bio = (props: RouteComponentProps<any>) => {
    return <App page="biography" {...props} />
}

const contact = (props: RouteComponentProps<any>) => {
    return <App page="contact" {...props} />
}

const fourohfour = () => {
    return <div>404</div>
}

export default Router