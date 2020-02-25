// React
import React, { Component } from "react"

// Redux
import { connect } from "react-redux"

// Actions
import { finishProject } from "../../../store/actions/projectsActions"

// Components
import { Form, Button, Badge } from "react-bootstrap"
import DataLoading from "../../components/DataLoading"
import { Redirect } from "react-router-dom"

class ProjectFinishComponent extends Component {
    constructor() {
        super()

        this.state = {
            finalDeliverables: [],
            error: ""
        }

        this.handleChange = this.handleChange.bind(this)
    }

    /**
     * handleChange() Handle selected final deliverables
     */
    handleChange(isChecked, id) {
        let finalDeliverables = this.state.finalDeliverables

        if (isChecked) {
            finalDeliverables.push(id)
        } else {
            finalDeliverables = finalDeliverables.filter(
                deliverable => deliverable !== id
            )
        }

        this.setState({ finalDeliverables })
    }

    /**
     * onSubmit() Submit project to finished
     */
    onSubmit = e => {
        e.preventDefault()

        let finalDeliverables = this.state.finalDeliverables

        if (!finalDeliverables.length) {
            this.setState({
                error: "You must select at least one deliverable."
            })
        } else {
            console.log("Finishing project")
            this.setState({ error: "" })

            let id = this.props.match.params.id

            this.props.finishProject(finalDeliverables, id)
        }
    }

    render() {
        let { project, role, isProcessingCompletion } = this.props
        let { error } = this.state

        // Restrict for Content Seeker only
        if (role !== "content seeker") {
            return <Redirect to={`/projects/${project._id}`} />
        }

        // Data loading spinner
        if (!project._id) {
            return <DataLoading />
        }

        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Final Deliverables</Form.Label>

                    {project.deliverables.map(deliverable => (
                        <Form.Check
                            key={deliverable._id}
                            type="checkbox"
                            onChange={e =>
                                this.handleChange(
                                    e.target.checked,
                                    deliverable._id
                                )
                            }
                            id={`checkbox-${deliverable._id}`}
                            label={deliverable.title}
                        />
                    ))}

                    {error && (
                        <Badge pill variant="danger">
                            {error}
                        </Badge>
                    )}

                    <Form.Text className="text-muted">
                        Select all the final deliverables for this project. Note
                        you can select multiple deliverables.
                    </Form.Text>
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    disabled={isProcessingCompletion}
                >
                    {!isProcessingCompletion
                        ? "Finish Project"
                        : "Processing..."}
                </Button>
            </Form>
        )
    }
}

// Mapping
const mapStateToProps = state => {
    return {
        role: state.auth.user.role[0].name,
        project: state.projects.singleProject,
        isProcessingCompletion: state.projects.isProcessingCompletion
    }
}

const mapDispatchToProps = dispatch => {
    return {
        finishProject: (finalDeliverables, id) =>
            dispatch(finishProject(finalDeliverables, id))
    }
}

// Export
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectFinishComponent)
