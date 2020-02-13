import React, { Component } from "react"
import { Link } from "react-router-dom"

class HomeContainer extends Component {
    render() {
        return (
            <div>
                <h1>This is the home page</h1>

                <Link className="btn btn-primary mr-2" to="/signin">
                    Sign In
                </Link>

                <Link className="btn btn-orange mr-2" to="/writer-signup">
                    Writer Sign Up
                </Link>

                <Link className="btn btn-orange" to="/content-seeker-signup">
                    Content Seeker Sign Up
                </Link>
            </div>
        )
    }
}

export default HomeContainer
