import React, { Component } from "react"
import { connect } from "react-redux"
import { TextArea } from "../../components/Form"
import { analyse } from "../../../store/actions/googleNLAPIActions"

class ProjectsContainer extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <>
                <h1>Projects list</h1>
            </>
        )
    }
}

// const mapStateToProps = state => {
//     return {
//         auth: state.auth.profile,
//         nlp: state.nlp
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         analyse: text => dispatch(analyse(text))
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer)

export default ProjectsContainer
