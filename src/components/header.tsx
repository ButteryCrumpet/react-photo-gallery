import * as React from "react"
import { Link } from "react-router-dom"

interface IProps {
    active: boolean
    current: string
    links: { [key: string]: string }
    logo: React.ReactNode
}

const Header: React.SFC<IProps> = (props) => {
    return  <header className={props.active ? "active" : "inactive"}>
        <div className="logo">
            {props.logo}
        </div>
        <nav>
        {Object.keys(props.links).map((link, i) => {
            return <Link key={i} to={props.links[link]}>
                <h4 className={`nav-link ${props.current === link ? "active" : ""}`}>
                    {link.charAt(0).toLocaleUpperCase() + link.substr(1)}
                </h4>
            </Link>
        })}
        </nav>
        {props.children}
    </header>
}

export default Header