// React
import React, { Component } from "react"
import { Redirect } from "react-router-dom"

// Redux
import { connect } from "react-redux"

// Actions
import { saveText, submitText } from "../../../store/actions/projectsActions"

// Components
import ReactMde from "react-mde"
import * as Showdown from "showdown"
import "react-mde/lib/styles/css/react-mde-all.css"
import { Button, Modal, Jumbotron, Form } from "react-bootstrap"

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
})

class ProjectTextEditorComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: "",
            writer_notes: "",
            title: "",
            selectedTab: "write",
            loaded: false,
            showModal: false,
            deliverableLength: 0,
            error: ''
        }

        // Binding this to work in the callback
        this.setValue = this.setValue.bind(this)
        this.setSelectedTab = this.setSelectedTab.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    /**
     * getDerivedStateFromProps() Load initial content from project into editor
     */
    static getDerivedStateFromProps(props, state) {
        // Inital load project text
        if (
            props.project &&
            props.project.content &&
            !state.text.length &&
            !state.loaded
        ) {
            // Store deliverables length for closing modal on success
            let deliverableLength = 0
            if (props.project.deliverables) {
                deliverableLength = props.project.deliverables.length
            }

            return {
                text: props.project.content,
                deliverableLength,
                loaded: true
            }
        } else if (
            props.project.deliverables &&
            props.project.deliverables.length !== state.deliverableLength
        ) {
            props.history.push('/projects/' + props.match.params.id)
        }

        return null
    }

    /**
     * setValue() Set value of text input
     */
    setValue(newValue, field) {
        this.setState({
            [field]: newValue
        })
    }

    /**
     * setSelectedTab() Set value of text input
     */
    setSelectedTab(newValue) {
        this.setState({
            selectedTab: newValue
        })
    }

    /**
     * toggleModal() Toggle modal to submit text visibility
     */
    toggleModal(value) {
        this.setState({
            showModal: value
        })
    }

    /**
     * onSubmit() Submit 
     */
    onSubmit() {
        if(!this.state.title.length) {
            this.setState({
                error: "You must enter a title."
            })
        } else {
            this.props.submitText(
                {
                    text: this.state.text,
                    title: this.state.title,
                    writer_notes: this.state.writer_notes
                },
                this.props.project
            )
        }
    }

    render() {
        if (this.props.role === "content seeker" && this.props.project._id) {
            return <Redirect push to={`/projects/${this.props.project._id}`} />
        }

        let submitModal = this.state.showModal && (
            <Modal
                show={this.state.showModal ? true : false}
                onHide={() => this.toggleModal(false)}
                animation={false}
                centered
                size="lg"
            >
                <Modal.Header>
                    <Modal.Title>Submit text for approval</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="textTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={this.state.title}
                            onChange={val =>
                                this.setValue(val.target.value, "title")
                            }
                            required
                        />
                        {this.state.error && (
                            <span className="badge badge-pill badge-danger">
                                {this.state.error}
                            </span>
                        )}
                    </Form.Group>

                    <Form.Group controlId="textNotes">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                            type="text"
                            value={this.state.writer_notes}
                            onChange={val =>
                                this.setValue(val.target.value, "writer_notes")
                            }
                        />
                    </Form.Group>

                    <h4 className="text-uppercase">Preview</h4>
                    <hr />
                    <Jumbotron
                        dangerouslySetInnerHTML={{
                            __html: converter.makeHtml(this.state.text)
                        }}
                    ></Jumbotron>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => this.toggleModal(false)}
                    >
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={this.onSubmit}
                    >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        )

        return (
            <>
                <ReactMde
                    minEditorHeight={500}
                    minPreviewHeight={500}
                    value={this.state.text}
                    onChange={val => this.setValue(val, "text")}
                    selectedTab={this.state.selectedTab}
                    onTabChange={this.setSelectedTab}
                    generateMarkdownPreview={markdown =>
                        Promise.resolve(converter.makeHtml(markdown))
                    }
                    className="mb-4"
                />

                <Button
                    variant="primary"
                    size="lg"
                    onClick={() =>
                        this.props.saveText(this.state.text, this.props.project)
                    }
                    disabled={this.props.saving}
                >
                    {this.props.saving ? "Saving..." : "Save"}
                </Button>

                <Button
                    variant="primary"
                    size="lg"
                    onClick={() => this.toggleModal(true)}
                    disabled={!this.state.text.length}
                >
                    Submit
                </Button>

                {submitModal}
            </>
        )
    }
}

// Mapping
const mapStateToProps = state => {
    return {
        role: state.auth.user.role[0].name,
        project: state.projects.singleProject,
        saving: state.projects.requestProcessing
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveText: (newText, project) => dispatch(saveText(newText, project)),
        submitText: (data, project) => dispatch(submitText(data, project))
    }
}

// Export
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectTextEditorComponent)
