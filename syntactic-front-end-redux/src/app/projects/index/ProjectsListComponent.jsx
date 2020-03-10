// React
import React, { Component } from "react"

// Components
import DataLoading from "../../components/DataLoading"
import ProjectsListTable from "../../components/projects/ProjectsListTable"
import ProjectsListGrid from "../../components/projects/ProjectsListGrid"

class ProjectsListComponent extends Component {
    render() {
        let {
            projects,
            display = "table",
            history,
            deleteProject,
            isWriter = false,
            loading
        } = this.props

        if(loading) {
            return <DataLoading />
        }

        return (
            <section className="project-list">
                {display === "table" ? (
                    <ProjectsListTable
                        projects={projects}
                        isWriter={isWriter}
                        history={history}
                        deleteProject={deleteProject}
                    />
                ) : display === "grid" ? (
                    <ProjectsListGrid
                        projects={projects}
                        isWriter={isWriter}
                        deleteProject={deleteProject}
                    />
                ) : (
                    "Unknown Display Type"
                )}
            </section>
        )
    }
}

export default ProjectsListComponent
