import React from "react"
import { Route } from "react-router-dom"

import Navbar from "../components/Navbar"

const AppLayout = ({ component, path, exact }) => {
    let page = exact ? (
        <Route exact path={path} component={component} />
    ) : (
        <Route path={path} component={component} />
    )

    return (
        <div>
            <Navbar />

            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-md-2 bg-secondary pt-3">
                        <ul>
                            <li>Home</li>
                            <li>Projects</li>
                            <li>Levels</li>
                            <li>Billing</li>
                            <li>Earnings</li>
                            <li>Settings</li>
                        </ul>
                    </div>
                    <div className="col-md-10">{page}</div>
                </div>
            </div>
        </div>
    )
}

export default AppLayout
