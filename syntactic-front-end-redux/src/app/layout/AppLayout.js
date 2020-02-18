// React
import React from "react"
import { Route } from "react-router-dom"

// Components
import Navbar from "../components/navbar/Navbar"
import Sidebar from "../components/sidebar/Sidebar"
import { Row, Col } from "react-bootstrap"

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
                <main className="container-fluid">
                    <Row className="justify-content-md-center mt-5">
                        <Col md={8} lg={10}>{page}</Col>
                    </Row>
                </main>
            </div>
        </div>
    )
}

export default AppLayout
