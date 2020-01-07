import React, { Component } from "react"
import { connect } from "react-redux"
import { TextArea } from "../../Form"
import { analyse } from "../../../store/actions/googleNLAPIActions"

class Projects extends Component {
    constructor() {
        super()

        this.state = {
            text: "",
            error: ""
        }

        // Binding this to work in the callback
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    /**
     * handleChange() Updates state from form input change
     */
    handleChange = (field, event) => {
        const target = event.target
        const value = target.value

        this.setState({
            [field]: value
        })
    }

    /**
     * handleSubmit() Submit content to be analysed by Google NL API for Search
     */
    handleSubmit = e => {
        e.preventDefault()
        this.props.analyse(this.state.text)
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">Projects</div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <TextArea
                            field="text"
                            value={this.state.text}
                            handleChange={this.handleChange}
                            error={this.props.nlp.error}
                            label="Project Brief"
                        />

                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>

                    <hr className="mt-5" />

                    {this.props.nlp.briefResults.bestMatch.writers.length !== 0 &&
                        this.props.nlp.briefResults.map(category => (
                            <>
                                <h3>Category: {category.name} with confidence of {category.confidence}%</h3>
                                <ul class="list-group mb-4">
                                    {category.writers.map(writer => (
                                    <li class="list-group-item">{ writer.user.first_name + ' ' + writer.user.last_name } - Written: {writer.articles_written} articles.</li>
                                    ))}
                                </ul>
                            </>
                        ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth.profile,
        nlp: state.nlp
    }
}

const mapDispatchToProps = dispatch => {
    return {
        analyse: text => dispatch(analyse(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)
