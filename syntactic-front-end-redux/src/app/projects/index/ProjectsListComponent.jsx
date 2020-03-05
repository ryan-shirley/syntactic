// React
import React, { Component } from "react"

// Components
import DataLoading from "../../components/DataLoading"
import ProjectsListTable from "../../components/projects/ProjectsListTable"
import ProjectsListGrid from "../../components/projects/ProjectsListGrid"

class ProjectsListComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: props.loading,
            isWriter: false
        }
    }

    render() {
        let { loading, isWriter = false } = this.state
        let { projects, display = 'table', history, deleteProject } = this.props

        if (!projects.length || loading) {
            return <DataLoading />
        } else {
            return (
                <section className="project-list">
                    {display === "table" ? (
                        <ProjectsListTable projects={projects} isWriter={isWriter} history={history} deleteProject={deleteProject} />
                    ) : display === "box" ? (
                        <ProjectsListGrid projects={projects} isWriter={isWriter} deleteProject={deleteProject} />
                    ) : (
                        "Unknown Display Type"
                    )}
                </section>
            )
        }
    }
}

export default ProjectsListComponent
