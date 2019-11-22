import React from 'react';
import { TextArea } from '../../components/Form'
import Button from '../../components/Button'

class WriterOnboarding extends React.Component {
    constructor() {
        super()

        this.state = {
            stage: 1,
            bio: '',
            error: '',
            texts: [],
            tempText: '',
            links: [],
            tempLink: ''
        }

        // Binding this to work in the callback
        this.nextStage = this.nextStage.bind(this)
        this.prevStage = this.prevStage.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.completeOnboarding = this.completeOnboarding.bind(this)
    }

    /**
     * nextStage() Advances to next stage in onboarding.
     * Checks if required data has be input.
     */
    nextStage(reqData) {
        if(this.state[reqData] === '') {
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
        // Ensure stage is not partial stage from uploading docs
        if(this.state.stage > 3 && this.state.stage < 4) {
            this.setState({ 
                stage: 3 ,
                error: ''
            })
        }
        else {
            let stage = this.state.stage - 1

            this.setState({ 
                stage,
                error: ''
            })
        }
    }

    /**
     * completeOnboarding() Send data to be processing with NLP
     * and send user to account home
     */
    completeOnboarding() {
        console.log('Onboarding Complete');

        fetch('http://localhost:4444/onboarding/writer', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bio: this.state.bio,
                texts: this.state.texts,
                links: this.state.links
            }),
        });
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

    /**
     * addWriterData() Add data to array of other writer info
     */
    addWriterData(type) {
        let tempData = type === 'texts' ? this.state.tempText : this.state.tempLink

        if(tempData === '') {
            this.setState({ 
                error: `The ${type} field is required to move onto the next stage.`
            })
        }
        else {
            this.setState(state => {
                const arry = [...state[type], tempData]

                return {
                    [type]: arry,
                    tempText: '',
                    tempLink: '',
                    stage: 4
                }
            })
        }
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
            title = 'Upload previous work so we can learn about you.'
            text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            nextButton = [
                <Button displayStyle='primary' onClick={(e) => this.setState({stage: 3.1})} key='texts'>Input Text</Button>, 
                <Button displayStyle='primary' onClick={(e) => this.setState({stage: 3.2})} key='links'>Link Web Page</Button>
            ]
        }
        else if(stage === 3.1) {
            title = 'Input your written document.'
            text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            form = <TextArea field='tempText' value={this.state.tempText} handleChange={this.handleChange} error={this.state.error} />
            nextButton = <Button displayStyle='primary' onClick={(e) => this.addWriterData('texts')}>Submit</Button>
            prevButton = true
        }
        else if(stage === 3.2) {
            title = 'Link to a piece of content you have written online.'
            text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            form = <TextArea field='tempLink' value={this.state.tempLink} handleChange={this.handleChange} error={this.state.error} />
            nextButton = <Button displayStyle='primary' onClick={(e) => this.addWriterData('links')}>Submit</Button>
            prevButton = true
        }
        else if(stage === 4) {
            title = 'Do you want to upload any more of your written work?'
            text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            nextButton = [
                <Button displayStyle='primary' onClick={(e) => this.nextStage()} key='no' >No</Button>,
                <Button displayStyle='primary' onClick={(e) => this.prevStage()} key='ye' >Yes</Button>
            ]
        }
        else if(stage === 5) {
            title = 'Finish so we can analyse your work using AI so businesses can find you.'
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

export default WriterOnboarding