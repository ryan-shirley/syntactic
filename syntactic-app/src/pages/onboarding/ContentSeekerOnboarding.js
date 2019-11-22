import React from 'react';
import { TextArea } from '../../components/Form'
import Button from '../../components/Button'

class ContentSeekerOnboarding extends React.Component {
    constructor() {
        super()

        this.state = {
            stage: 1,
            bio: '',
            business: '',
            error: ''
        }

        // Binding this to work in the callback
        this.nextStage = this.nextStage.bind(this)
        this.prevStage = this.prevStage.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    /**
     * nextStage() Advances to next stage in onboarding.
     * Checks if required data has be input.
     */
    nextStage(reqData = null) {
        if(reqData && this.state[reqData] === '') {
            this.setState({ 
                error: `The ${reqData} field is required to move onto the next stage.`
            })
        }
        else {
            let stage = this.state.stage + 1

            this.setState({ 
                stage,
                error: ''
            })
        }
    }

    /**
     * prevStage() Return to previous stage in onboarding
     */
    prevStage() {
        let stage = this.state.stage - 1

        this.setState({ 
            stage,
            error: ''
        })
    }

    /**
     * completeOnboarding() Send data to be processing with NLP
     * and send user to account home
     */
    completeOnboarding() {
        console.log('Onboarding Complete');
    }

    /**
     * handleChange() Updates state from form input change
     */
    handleChange(field, event) {
        const target = event.target
        const value = target.value

        this.setState({
            [field]: value
        })
    }
    
    render() {
        let stage = this.state.stage
        let title, text, nextButton, prevButton, form

        // Different form and text per stage
        if(stage === 1) {
            title = 'Setup your account.'
            text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            nextButton = <Button displayStyle='primary' onClick={this.nextStage}>Get Started</Button>
        }
        else if(stage === 2) {
            title = 'Who are you?'
            text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            form = <TextArea field='bio' value={this.state.bio} handleChange={this.handleChange} error={this.state.error} />
            nextButton = <Button displayStyle='primary' onClick={(e) => this.nextStage('bio')}>Next</Button>
        }
        else if(stage === 3) {
            title = 'Describe you business.'
            text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            form = <TextArea field='business' value={this.state.business} handleChange={this.handleChange} error={this.state.error} />
            nextButton = <Button displayStyle='primary' onClick={(e) => this.nextStage('business')}>Next</Button>
            prevButton = true
        }
        else if(stage === 4) {
            title = 'You are ready to search for writers for your next big project.'
            text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            nextButton = <Button displayStyle='primary' onClick={this.completeOnboarding}>Finish</Button>
            prevButton = true
        }

        // Check for previous button
        if(prevButton) {
            prevButton = <Button displayStyle='secondary' onClick={this.prevStage}>Back</Button>
        }

        return (
            <div className="row">
                <div className="col-12">
                    <p>Stage: {stage}</p>
                    <h2>{title}</h2>
                    <p>{text}</p>
                    
                    {form}

                    {prevButton} {nextButton}
                </div>
            </div>
        )
    }
}

export default ContentSeekerOnboarding