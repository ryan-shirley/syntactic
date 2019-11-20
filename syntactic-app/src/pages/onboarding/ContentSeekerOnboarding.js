import React from 'react';
import { TextArea } from '../../components/Form'

class ContentSeekerOnboarding extends React.Component {
    constructor() {
        super()

        this.state = {
            stage: 1,
            bio: '',
            business: ''
        }

        // Binding this to work in the callback
        this.nextStage = this.nextStage.bind(this)
        this.prevStage = this.prevStage.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    /**
     * nextStage() Advances to next stage in onboarding
     */
    nextStage() {
        // If at end of stages complete onboarding
        if(this.state.stage === 4) {
            this.completeOnboarding()
        }
        else {
            let stage = this.state.stage + 1

            this.setState({ 
                stage: stage
            })
        }
    }

    /**
     * prevStage() Return to previous stage in onboarding
     */
    prevStage() {
        let stage = this.state.stage - 1

        this.setState({ 
            stage: stage
        })
    }

    /**
     * completeOnboarding() Send data to be processing with NLP
     * and send user to account home
     */
    completeOnboarding() {
        console.log('Onboarding Compelte');
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
        let title, helpText, form, nextButton, nextButtonText, prevButton, displayPrevBtn
        let stage = this.state.stage

        // Change UI information depending on state
        if(stage === 1) {
            title = 'Setup your account.'
            helpText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            nextButtonText = 'Get Started'
        }
        else if(stage === 2) {
            title = 'Who are you?'
            helpText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            form = <TextArea field='bio' value={this.state.bio} handleChange={this.handleChange} />
            nextButtonText = 'Next'
        }
        else if(stage === 3) {
            title = 'Describe you business.'
            helpText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            form = <TextArea field='business' value={this.state.business} handleChange={this.handleChange} />
            nextButtonText = 'Next'
            displayPrevBtn = true
        }
        else if(stage === 4) {
            title = 'You are ready to search for writers for your next big project.'
            helpText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            nextButtonText = 'Finish'
            displayPrevBtn = true
        }

        // Check for advancing button
        if(nextButtonText) {
            nextButton = <button type="button" className="btn btn-primary" onClick={this.nextStage}>{nextButtonText}</button>
        }

        // Check for previous button
        if(displayPrevBtn) {
            prevButton = <button type="button" className="btn btn-primary" onClick={this.prevStage}>Back</button>
        }

        return (
            <div className="row">
                <div className="col-12">
                    <p>Stage: {this.state.stage}</p>
                    <h2>{title}</h2>
                    <p>{helpText}</p>
                    
                    {form}
                    
                    {prevButton} {nextButton}
                </div>
            </div>
        )
    }
}

export default ContentSeekerOnboarding