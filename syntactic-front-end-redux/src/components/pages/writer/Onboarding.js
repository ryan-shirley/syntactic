import React, { Component } from "react"
import Button from "../../Button"
import { TextArea } from '../../Form'

class Onboarding extends Component {
    constructor() {
        super()

        this.state = {
            stage: 1,
            bio: '',
            content: [],
            inputText: '',
            inputType: null
        }

        // Binding this to work in the callback
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        // Handle stage changes
        this.nextStage = this.nextStage.bind(this)
        this.prevStage = this.prevStage.bind(this)
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
     * handleSubmit() Submit content to be analysed by Google NL API
     * also update user profile information.
     */
    handleSubmit = e => {
        this.props.addContentMultiple(this.state.content)
    }

    /**
     * nextStage() Advances to next stage in onboarding.
     * Checks if required data has be input.
     */
    nextStage(reqData = null) {
        if(reqData !== null && this.state[reqData] === '') {
            this.setState({ 
                error: `This field is required to move onto the next stage. Field: ${reqData}.`
            })
        }
        else {
            let stage = this.state.stage + 1

            this.setState({ 
                stage,
                error: '',
                inputText: ''
            })
        }
    }

    /**
     * prevStage() Return to previous stage
     */
    prevStage() {
        let stage = this.state.stage - 1

        this.setState({ 
            stage,
            error: '',
            inputText: '',
            inputType: null
        })
    }

    /**
     * addWriterData() Add text to writer content array
     */
    addContentText() {
        if(this.state.inputText === '') {
            this.setState({ 
                error: `You must enter a value!`
            })
        }
        else {
            this.setState(state => {
                const newContent = [...state['content'], this.state.inputText]

                return {
                    content: newContent,
                    inputText: '',
                    inputType: null,
                    stage: 3
                }
            })
        }
    }

    render() {
        let stage = this.state.stage
        let title, text, buttons, form, submitFormButton
        let prevButton = <Button displayStyle='secondary mr-2' onClick={this.prevStage} key="back">Back</Button>

        // Vary content depending on stage
        switch (stage) {
            case 1: // Start Process
                title = 'Setup your account.'
                text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
                buttons = <Button displayStyle='primary' onClick={(e) => this.nextStage()}>Get Started</Button>

                break
            case 2: // Bio
                title = 'Who are you?'
                text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
                form = <TextArea field='bio' value={this.state.bio} handleChange={this.handleChange} error={this.state.error} />
                buttons = <Button displayStyle='primary' onClick={(e) => this.nextStage('bio')}>Next</Button>

                break
            case 3: // Choose how to upload | Finish
                title = 'Upload previous work so we can learn about you.'
                text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
                buttons = [
                    <Button displayStyle='primary' onClick={(e) => this.setState({stage: 4, inputType: 'text'})} key='texts'>Input Text</Button>
                ]

                // Only show finish button if added 3 or more pieces of content.
                if(this.state.content.length >= 3) {
                    submitFormButton = <p><Button displayStyle='primary mt-3' onClick={this.handleSubmit}>Finish Onboarding</Button></p>
                }

                break
            case 4: // Add Content

                // Vary layout depending on input type
                switch (this.state.inputType) {
                    case 'text':
                        title = 'Input your written document.'
                        text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
                        form = <TextArea field='inputText' value={this.state.inputText} handleChange={this.handleChange} error={this.state.error} />
                        buttons = [
                            prevButton, 
                            <Button displayStyle='primary' onClick={(e) => this.addContentText()} key="submit">Submit</Button>
                        ]
                        
                        break
                    default:
                            title = 'Error.. This input type does not exixt.'
                }

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
                                Content amount <span className="badge badge-light ml-2">{this.state.content.length}</span>
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

export default Onboarding
