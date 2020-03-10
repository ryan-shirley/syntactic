// React
import React from "react"

// Components
import { Row, Col } from "react-bootstrap"
import Stat from "./Stat"

const StatsList = props => {
    let stats = props.stats

    return (
        <Row className="stats">
            {stats.map(stat => (
                <Col sm={12/stats.length} key={stat.title}>
                    <Stat stat={stat} />
                </Col>
            ))}
        </Row>
    )
}

export default StatsList
