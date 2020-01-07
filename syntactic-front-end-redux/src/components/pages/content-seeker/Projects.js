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
        const { briefResults, completed } = this.props.nlp
        
        let bestMatch = []

        if(completed) {
            for(let i = 0; i < briefResults.length; i++) {
                let writers = briefResults[i].bestMatch.writers
                if(writers.length) {
                    bestMatch = [...bestMatch, ...writers]
                }
            }
        }

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

                    {completed && (bestMatch.length ? (
                        <>
                            <h1>Category Results</h1>
                            {briefResults.map(cat => (
                                <li className="list-group-item" key={cat.bestMatch.category}>{cat.bestMatch.category}</li>
                            ))}

                            <h3 className="mt-4">Best Matched Writers</h3>
                            {bestMatch.map(writer => (
                                <li className="list-group-item" key={writer.user._id}>{ writer.user.first_name + ' ' + writer.user.last_name } - Written: {writer.articles_written} articles.</li>
                            ))}
                        </>
                    ) : 'No writers were matched here.')}
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
