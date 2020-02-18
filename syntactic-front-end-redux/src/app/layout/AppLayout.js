import React from "react"
import { Route } from "react-router-dom"

import Navbar from "../components/navbar/Navbar"
import Sidebar from "../components/sidebar/Sidebar"

const AppLayout = ({ component, path, exact }) => {
    let page = exact ? (
        <Route exact path={path} component={component} />
    ) : (
        <Route path={path} component={component} />
    )

    return (
        <div className="d-flex">
            <Sidebar />

            <div id="page-content-wrapper">
                <Navbar />
                <main className="container-fluid">{page}</main>
            </div>
        </div>
    )
}

export default AppLayout
