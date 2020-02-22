// React
import React, { Component } from "react"

// Components
import { Card } from "react-bootstrap"

class LevelsComponent extends Component {
    render() {
        let levels = this.props.levels.map(level => (
            <Card body className="mb-1" key={level.category}>{level.category + ' -  lv ' + level.level}</Card>
        ))

        return levels
    }
}

export default LevelsComponent
