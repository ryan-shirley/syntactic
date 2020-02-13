// Redux
import { connect } from "react-redux"

// Presentational omponent
import OnboardingContentSeekerComponent from "./OnboardingWriterComponent"

// Actions
import { updateBio, moveStage, loadContentInput, analyseTextProject, completeOnboarding } from "../../store/actions/onboardingActions"

// Mapping
const mapStateToProps = state => {
    return {
        onboarding: state.onboarding,
        user_id: state.auth.user._id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        nextStage: () => dispatch(moveStage(1)),
        prevStage: () => dispatch(moveStage(-1)),
        updateBio: (user_id, newBio) => dispatch(updateBio(user_id, newBio)),
        loadContentInput: inputType => dispatch(loadContentInput(inputType)),
        analyseTextProject: text => dispatch(analyseTextProject(text)),
        completeOnboarding: user_id => dispatch(completeOnboarding(user_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingContentSeekerComponent)