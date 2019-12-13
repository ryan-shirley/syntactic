import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

class Dashboard extends Component {
    componentDidMount() {
        // const { auth } = this.props
        
        // if (!auth.uid) return <Redirect to="/signin" />

        console.log("Conponent did mount")
    }

    render() {
        const { auth, categories } = this.props
        // if (!auth.uid) return <Redirect to="/signin" />

        return (
            <div>
                This is the dashboard
            </div>
        )
    }
}

const mapStateToProps = state => {
    // console.log(state);
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Dashboard)
