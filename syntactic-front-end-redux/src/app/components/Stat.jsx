// React
import React from "react"

// Components
import { Row, Col, Card } from "react-bootstrap"

const Stat = props => {
    let stat = props.stat

    return (
        <Card body className="stat">
            <Row>
                <Col xs="auto">
                    <span className={"icon icon-" + stat.colour}>{stat.icon}</span>
                </Col>
                <Col>
                    <p className="details">
                        {stat.title}
                        <span className="number">{stat.number}</span>
                    </p>
                </Col>
            </Row>
        </Card>
    )
}

export default Stat
