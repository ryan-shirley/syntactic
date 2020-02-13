import React from "react"
import { Route } from "react-router-dom"

import Navbar from "../../components/layout/Navbar"
import Sidebar from "../../components/layout/Sidebar"

const AppLayout = ({ component, path, exact }) => {
    let page = exact ? (
        <Route exact path={path} component={component} />
    ) : (
        <Route path={path} component={component} />
    )

    return (
        <div>
            <Navbar />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 col-lg-1 bg-primary-dark pt-5">
                        <Sidebar />
                    </div>
                    <div className="col-md-10 col-lg-11 pt-5">{page}</div>
                </div>
            </div>
        </div>
    )
}

export default AppLayout
