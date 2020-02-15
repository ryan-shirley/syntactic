// React
import React from "react"

// Redux
import { connect } from "react-redux"

// Components
import OverviewComponent from "./OverviewComponent"
// import { default as WriterProjects } from "./writer/ProjectsContainer"

// Actions
// import { getAllProjects } from "../../store/actions/projectsActions"

const ProjectCreateContainer = props => {
    const path = props.location.pathname
    
    if(path === '/projects/create') {
        return <OverviewComponent />
    }
    else {
        return 'Project alread created but needs more creating'
    }

    // const { user } = props
    // const role = user.role[0].name

    // // Request All projects
    // props.getAllProjects()

    // if (role === "writer") {
    //     return <WriterProjects />
    // } else if (role === "content seeker") {
    //     return <ContentSeekerProjects />
    // }
}

// Mapping
// const mapStateToProps = state => {
//     return {
//         user: state.auth.user
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         getAllProjects: () => dispatch(getAllProjects())
//     }
// }

// Export
// export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreate)
export default ProjectCreateContainer
