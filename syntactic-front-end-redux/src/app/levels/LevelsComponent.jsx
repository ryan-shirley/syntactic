// React
import React, { Component } from "react"

// Components
import { Card, Badge } from "react-bootstrap"

class LevelsComponent extends Component {
    render() {
        let levels = (
            <ul
                className={
                    "card-list " +
                    (this.props.levels.length === 1
                        ? "single"
                        : this.props.levels.length === 2
                        ? "double"
                        : "multi")
                }
            >
                {" "}
                {this.props.levels.map(level => (
                    <li className="item" key={level.category}>
                        <Card body>
                            {level.category}{" "}
                            <Badge
                                variant={level.level < 2 ? "warning" : level.level <= 4 ? "info" : "success"}
                                className="float-right badge-md text-uppercase"
                            >
                                lv {level.level}
                            </Badge>
                        </Card>
                    </li>
                ))}
            </ul>
        )

        return levels
    }
}

export default LevelsComponent
