import React, { Component } from "react"
import Button from "../../Button"
import { TextArea } from '../../Form'
import { connect } from "react-redux"
import { updateBio, updateBusiness, prevStage, nextStage, finishOnboarding } from "../../../store/actions/onboardingActions"
import { updateOnboardingStatus } from "../../../store/actions/authActions"

class Onboarding extends Component {
    constructor() {
        super()

        this.state = {
            inputText: ''
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
                inputText: ''
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
            this.props.updateOnboardingStatus()
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
                buttons = <Button displayStyle='primary' onClick={(e) => this.props.updateBio(this.state.inputText)} disabled={this.props.onboarding.waitingForResponse}>Next</Button>

                break
            case 3: // Describe Business & Finish
                title = 'Describe your business.'
                text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
                form = <TextArea field='inputText' value={this.state.inputText} handleChange={this.handleChange} error={this.props.onboarding.error} />
                buttons = <Button displayStyle='primary' onClick={(e) => this.props.updateBusiness(this.state.inputText)} disabled={this.props.onboarding.waitingForResponse}>Next</Button>

                break
            case 4: // Finish
                title = 'You are ready to search for writers for your next big project.'
                text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
                submitFormButton = <p><Button displayStyle='primary mt-3' onClick={this.props.finishOnboarding} disabled={this.props.onboarding.waitingForResponse}>Finish Onboarding</Button> {this.props.onboarding.error}</p>

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

                            <button type="button" className="btn btn-primary">
                                Content amount <span className="badge badge-light ml-2">{this.props.onboarding.content.length}</span>
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

const mapStateToProps = state => {
    return {
        onboarding: state.onboarding
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateBio: newBio => dispatch(updateBio(newBio)),
        updateBusiness: newBusinessDesc => dispatch(updateBusiness(newBusinessDesc)),
        prevStage: () => dispatch(prevStage()),
        nextStage: () => dispatch(nextStage()),
        finishOnboarding: () => dispatch(finishOnboarding()),
        updateOnboardingStatus: () => dispatch(updateOnboardingStatus())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding)