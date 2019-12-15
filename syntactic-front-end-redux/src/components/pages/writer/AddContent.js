import React from "react"
import { connect } from "react-redux"
import { addContent } from "../../../store/actions/googleNLAPIActions"

class AddContent extends React.Component {
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
    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    /**
     * handleSubmit() Submit content to be analysed by Google NL API
     */
    handleSubmit = e => {
        e.preventDefault()
        this.props.addContent(this.state.text)
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h2>Add text</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <textarea
                                className="form-control"
                                id="text"
                                rows="10"
                                onChange={this.handleChange}
                            ></textarea>
                        </div>

                        <p><span className="badge badge-pill badge-danger">{this.props.nlpError}</span></p>
                        

                        <button type="submit" className="btn btn-primary">
                            Add Content
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        nlpError: state.nlp.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addContent: text => dispatch(addContent(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddContent)
