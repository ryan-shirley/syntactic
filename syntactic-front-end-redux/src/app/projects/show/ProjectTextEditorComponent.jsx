// React
import React, { Component } from "react"
import { Redirect } from "react-router-dom"

// Redux
import { connect } from "react-redux"

// Actions
import { saveText } from "../../../store/actions/projectsActions"

// Components
import ReactMde from "react-mde"
import * as Showdown from "showdown"
import "react-mde/lib/styles/css/react-mde-all.css"
import { Button } from "react-bootstrap"

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
            text: '',
            selectedTab: "write"
        }

        // Binding this to work in the callback
        this.setValue = this.setValue.bind(this)
        this.setSelectedTab = this.setSelectedTab.bind(this)
    }

    /**
     * getDerivedStateFromProps() Load initial content from project into editor
     */
    static getDerivedStateFromProps(props, state) {
        if(props.project && props.project.content && !state.text.length) {
            return { text: props.project.content }
        } else {
            return null
        }
    }

    /**
     * setValue() Set value of text input
     */
    setValue(newValue) {
        this.setState({
            text: newValue
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

    render() {
        if (this.props.role === "content seeker" && this.props.project._id) {
            return <Redirect push to={`/projects/${this.props.project._id}`} />
        }

        return (
            <>
                <ReactMde
                    minEditorHeight={500}
                    value={this.state.text}
                    onChange={this.setValue}
                    selectedTab={this.state.selectedTab}
                    onTabChange={this.setSelectedTab}
                    generateMarkdownPreview={markdown =>
                        Promise.resolve(converter.makeHtml(markdown))
                    }
                    className="mb-4"
                />

                <Button variant="primary" size="lg" onClick={() => this.props.saveText(this.state.text, this.props.project)} disabled={this.props.saving}>{this.props.saving ? 'Saving...' : 'Save'}</Button>
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
    }
}

// Export
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectTextEditorComponent)
