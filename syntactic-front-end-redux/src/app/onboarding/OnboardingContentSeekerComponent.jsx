import React, { Component } from "react"

// Components
import Button from "../components/Button"
import { TextArea } from '../components/Form'

class OnboardingContentSeekerComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            inputText: ''
        }

        // Binding this to work in the callback
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
     * componentDidUpdate() Monitor for stage change and
     * reset input text value
     */
    componentDidUpdate(nextProps) {
        if (nextProps.onboarding.stage !== this.props.onboarding.stage) {
            this.setState({
                inputText: ''
            })
        }
    }

    render() {
        // Once completed update status in store
        if (this.props.onboarding.completed) {
            this.props.history.push('/dashboard')
        }

        let stage = this.props.onboarding.stage
        let title, text, buttons, form, submitFormButton
        let prevButton = <Button displayStyle='secondary mr-2' onClick={this.props.prevStage} key="back">Back</Button>

        // Vary content depending on stage
        switch (stage) {
            case 1: // Start Process
                title = 'Setup your account.'
                text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
                buttons = <Button displayStyle='primary' onClick={(e) => this.props.nextStage()}>Get Started</Button>

                break
            case 2: // Bio
                title = 'Who are you?'
                text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
                form = <TextArea field='inputText' value={this.state.inputText} handleChange={this.handleChange} error={this.props.onboarding.error} />
                buttons = [
                    prevButton, 
                    <Button displayStyle='primary' onClick={(e) => this.props.updateBio(this.props.user_id, this.state.inputText)} disabled={this.props.onboarding.waitingForResponse}>Next</Button>
                ]

                break
            case 3: // Describe Business & Finish
                title = 'Describe your business.'
                text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
                form = <TextArea field='inputText' value={this.state.inputText} handleChange={this.handleChange} error={this.props.onboarding.error} />
                buttons = [
                    prevButton, 
                    <Button displayStyle='primary' onClick={(e) => this.props.updateBusiness(this.props.user_id, this.state.inputText)} disabled={this.props.onboarding.waitingForResponse}>Next</Button>
                ]

                break
            case 4: // Finish
                title = 'You are ready to search for writers for your next big project.'
                text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
                submitFormButton = <p><Button displayStyle='primary mt-3' onClick={() => this.props.completeOnboarding(this.props.user_id)} disabled={this.props.onboarding.waitingForResponse}>Finish Onboarding</Button> {this.props.onboarding.error}</p>

                break
            default:
                title = 'Error.. This stage does not exixt.'
        }

        return (
            <div className="row mt-5">
                <div className="col-12">
                    <div className="card">
                        <h5 className="card-header text-center">
                            <button type="button" className="btn btn-primary mr-3">
                                Stage <span className="badge badge-light ml-2">{stage}</span>
                            </button>
                        </h5>
                        <div className="card-body text-center">
                            <h2 className="card-title">{title}</h2>
                            <p className="card-text">
                                {text}
                            </p>
                            {form}

                            {buttons}

                            {submitFormButton}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default OnboardingContentSeekerComponent