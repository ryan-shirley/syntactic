import React, { Component } from "react"
import { connect } from "react-redux"

class Projects extends Component {
    render() {
        return <div>This is content writer</div>
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth.profile
    }
}

export default connect(mapStateToProps)(Projects)
