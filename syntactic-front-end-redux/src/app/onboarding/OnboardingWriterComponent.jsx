import React, { Component } from "react"

// Components
import Button from "../components/Button"
import { TextArea } from "../components/Form"
import { Container } from "react-bootstrap"

class OnboardingWriterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: ""
        }

        // Binding this to work in the callback
        this.handleChange = this.handleChange.bind(this)
    }

    /**
     * componentDidUpdate() Monitor for stage change and
     * reset input text value
     */
    componentDidUpdate(nextProps) {
        if (nextProps.onboarding.stage !== this.props.onboarding.stage) {
            this.setState({
                text: ""
            })
        }
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

    render() {
        // Once completed update status in store
        if (this.props.onboarding.completed) {
            this.props.history.push("/dashboard")
        }

        let stage = this.props.onboarding.stage
        let title, text, buttons, form, submitFormButton
        let prevButton = (
            <Button
                displayStyle="secondary mr-2"
                onClick={this.props.prevStage}
                key="back"
            >
                Back
            </Button>
        )

        // Vary content depending on stage
        switch (stage) {
            case 1: // Start Process
                title = "Setup your account."
                text =
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
                buttons = (
                    <Button
                        displayStyle="primary"
                        onClick={e => this.props.nextStage()}
                    >
                        Get Started
                    </Button>
                )

                break
            case 2: // Bio
                title = "Who are you?"
                text =
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
                form = (
                    <TextArea
                        field="text"
                        value={this.state.text}
                        handleChange={this.handleChange}
                        error={this.props.onboarding.error}
                    />
                )
                buttons = (
                    <Button
                        displayStyle="primary"
                        onClick={e =>
                            this.props.updateBio(
                                this.props.user_id,
                                this.state.text
                            )
                        }
                        disabled={this.props.onboarding.requestProcessing}
                    >
                        Next
                    </Button>
                )

                break
            case 3: // Choose how to upload | Finish
                title = "Upload previous work so we can learn about you."
                text =
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
                buttons = [
                    <Button
                        displayStyle="primary"
                        onClick={e => this.props.loadContentInput("text")}
                        key="text"
                    >
                        Input Text
                    </Button>
                ]

                // Only show finish button if added 3 or more pieces of content.
                if (this.props.onboarding.contentCount >= 3) {
                    submitFormButton = (
                        <p>
                            <Button
                                displayStyle="primary mt-3"
                                onClick={() =>
                                    this.props.completeOnboarding(
                                        this.props.user_id
                                    )
                                }
                                disabled={
                                    this.props.onboarding.requestProcessing
                                }
                            >
                                Finish Onboarding
                            </Button>{" "}
                            {this.props.onboarding.error}
                        </p>
                    )
                }

                break
            case 4: // Add Content
                // Vary layout depending on input type
                switch (this.props.onboarding.inputType) {
                    case "text":
                        title = "Input your written document."
                        text =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
                        form = (
                            <TextArea
                                field="text"
                                value={this.state.text}
                                handleChange={this.handleChange}
                                error={this.props.onboarding.error}
                            />
                        )
                        buttons = [
                            prevButton,
                            <Button
                                displayStyle="primary"
                                onClick={e =>
                                    this.props.analyseTextProject(
                                        this.state.text
                                    )
                                }
                                disabled={
                                    this.props.onboarding.requestProcessing
                                }
                                key="submit"
                            >
                                Submit
                            </Button>
                        ]

                        break
                    default:
                        title = "Error.. This input type does not exixt."
                }

                break
            default:
                title = "Error.. This stage does not exixt."
        }

        return (
            <Container>
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="card">
                            <h5 className="card-header text-center">
                                <button
                                    type="button"
                                    className="btn btn-primary mr-3"
                                >
                                    Stage{" "}
                                    <span className="badge badge-light ml-2">
                                        {stage}
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    Content amount{" "}
                                    <span className="badge badge-light ml-2">
                                        {this.props.onboarding.contentCount}
                                    </span>
                                </button>
                            </h5>
                            <div className="card-body text-center">
                                <h2 className="card-title">{title}</h2>
                                <p className="card-text">{text}</p>
                                {form}

                                {buttons}

                                {submitFormButton}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}

export default OnboardingWriterComponent
