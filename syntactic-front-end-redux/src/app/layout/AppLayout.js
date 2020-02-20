// React
import React from "react"
import { Route, Switch } from "react-router-dom"

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

    return (
        <div className="d-flex">
            <Sidebar />

            <div id="page-content-wrapper">
                <Navbar />
                <main className="container-fluid">
                    <Row className="justify-content-md-center mt-5">
                        <Col md={8} lg={10}>
                            {page}

                            {children.length &&
                                children.map(childRoute => (
                                    <Route
                                        key={`${path}${childRoute.path}`}
                                        path={`${path}${childRoute.path}`}
                                        component={childRoute.page}
                                    />
                                ))}
                        </Col>
                    </Row>
                </main>
            </div>
        </div>
    )
}

export default AppLayout
