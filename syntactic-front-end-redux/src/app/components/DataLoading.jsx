import React, { Component } from "react"
import UseAnimations from "react-useanimations"

export default class DataLoading extends Component {
    render() {
        return (
            <div className="loading-screen">
                <UseAnimations animationKey="loading2" />
            </div>
        )
    }
}
