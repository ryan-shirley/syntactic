// React
import React, { Component } from "react"

// Components
import { Card, Badge } from "react-bootstrap"

class LevelsComponent extends Component {
    render() {
        let sortedLevels = this.props.levels.sort(
            (a, b) => new Date(b.level) - new Date(a.level)
        )

        let levels = (
            <ul
                className={
                    "card-list " +
                    (sortedLevels.length === 1
                        ? "single"
                        : sortedLevels.length === 2
                        ? "double"
                        : "multi")
                }
            >
                {" "}
                {sortedLevels.map(level => (
                    <li className="item" key={level.category}>
                        <Card body>
                            {level.category}{" "}
                            <Badge
                                variant={
                                    level.level < 2
                                        ? "warning"
                                        : level.level <= 4
                                        ? "info"
                                        : "success"
                                }
                                className="float-right badge-md text-uppercase"
                            >
                                lv {level.level}
                            </Badge>
                        </Card>
                    </li>
                ))}
            </ul>
        )

        return (
            <>
                <h1 className="mb-4">Levels</h1>
                {levels}
            </>
        )
    }
}

export default LevelsComponent
