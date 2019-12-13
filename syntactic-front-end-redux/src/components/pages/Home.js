import React, { Component } from "react"
import { Link } from "react-router-dom"

class Home extends Component {

    render() {
        return (
            <div>
                <h1>This is the home page</h1>

                <Link className="btn btn-primary mr-2" to="/signin">
                    Sign In
                </Link>

                <Link className="btn btn-orange" to="/signup">
                    Sign Up
                </Link>
            </div>
        )
    }
}

export default Home
