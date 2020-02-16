// React
import React, { Component } from "react"

// Redux
import { connect } from "react-redux"

// Actions
import { getProject } from "../../../store/actions/projectsActions"

class ProjectShowContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    /**
     * getDerivedStateFromProps() Load individual project 
     */
    componentWillMount() {
        let id = this.props.match.params.id
        this.props.getProject(id)

        // const path = props.location.pathname

        // // Project wasn't just created and don't have or currently fetching
        // if (path !== "/projects/create" && !props.projects.justCreated && !props.projects.singleProject.title && !props.projects.requestProcessing && !props.projects.error.message) {
        //     let id = props.match.params.id
        //     props.getProject(id)
        // } else if(path !== "/projects/create") {
        //     console.log("Was just created")
        // }

        return null
    }

    render() {
        return (
            <div>
                <h1>This is the project show page</h1>
            </div>
        )
    }
}

// Mapping
const mapStateToProps = state => {
    return {
        project: state.projects.singleProject,
        processingRequest: state.projects.processingRequest,
        error: state.projects.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProject: id => dispatch(getProject(id))
    }
}

// Export
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectShowContainer)

