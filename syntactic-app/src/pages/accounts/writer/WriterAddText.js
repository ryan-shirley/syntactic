import React from "react"
import axios from 'axios';
import { TextArea } from "../../../components/Form"
import Button from "../../../components/Button"

class WriterAddText extends React.Component {
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
    handleChange(field, event) {
        this.setState({
            [field]: event.target.value
        })
    }

    /**
     * handleSubmit() Submit form to be analysed
     */
    handleSubmit(event) {
        event.preventDefault()

        // Check text has been entered
        if (this.state.text === "") {
            this.setState({
                error: `The text field is required to submit.`
            })
        } else {
            console.log("Submitting form")

            axios.post('http://localhost:4444/users/writer/newText', {
                    uid: "userid",
                    text: this.state.text
                })
                .then(res => {
                    console.log('Added text sucessfully');

                    this.props.history.push("/writer/1")
                })
                .catch(error => {
                    console.log('Error');

                    this.setState({
                        error: error.response.data.details
                    })
                })
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h2>Add text</h2>
                </div>
                <div className="card-body">
                    <p>This is for your account</p>
                    <form>
                        <TextArea
                            field="text"
                            handleChange={this.handleChange}
                            error={this.state.error}
                        />

                        <Button displayStyle="primary" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default WriterAddText
