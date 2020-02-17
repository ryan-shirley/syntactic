// Redux
import { connect } from "react-redux"

// Presentational omponent
import OnboardingContentSeekerComponent from "./OnboardingContentSeekerComponent"

// Actions
import {
    updateBio,
    updateBusiness,
    moveStage,
    completeOnboarding
} from "../../store/actions/onboardingActions"

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
        updateBusiness: (user_id, newBusinessDesc) => dispatch(updateBusiness(user_id, newBusinessDesc)),
        completeOnboarding: user_id => dispatch(completeOnboarding(user_id))
    }
}

// Export
const OnboardingContentSeekerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OnboardingContentSeekerComponent)
export default OnboardingContentSeekerContainer
