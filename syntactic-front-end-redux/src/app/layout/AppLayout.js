// React
import React from "react"
import { Route } from "react-router-dom"

// Components
import Navbar from "../components/navbar/Navbar"
import Sidebar from "../components/sidebar/Sidebar"
import { Row, Col } from "react-bootstrap"

const AppLayout = ({ component, path, exact, children }) => {
    let page = exact ? (
        <Route exact path={path} component={component} />
    ) : (
        <Route path={path} component={component} />
    )

    let childRoutes =
        children.length &&
        children.map(childRoute => (
            <Route
                key={`${path}${childRoute.path}`}
                path={`${path}${childRoute.path}`}
                component={childRoute.page}
            />
        ))

    let rootChild =
        children.length &&
        children.find(childRoute => {
            return childRoute.showOnRoot === true && childRoute.page
        })

    rootChild = rootChild ? <Route path="/" exact component={rootChild.page} /> : null 
    

    return (
        <div className="d-flex">
            <Sidebar />

            <div id="page-content-wrapper">
                <Navbar />
                <main className="container-fluid">
                    <Row className="justify-content-md-center mt-5">
                        <Col md={8} lg={10}>
                            {page}
                            {rootChild}
                            {childRoutes}
                        </Col>
                    </Row>
                </main>
            </div>
        </div>
    )
}

export default AppLayout
