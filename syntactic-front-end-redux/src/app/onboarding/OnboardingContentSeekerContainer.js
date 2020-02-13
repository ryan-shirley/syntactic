// Redux
import { connect } from "react-redux"

// Presentational omponent
import OnboardingContentSeekerComponent from "./OnboardingContentSeekerComponent"

// Actions
import {
    updateBio,
    updateBusiness,
    prevStage,
    nextStage,
    finishOnboarding
} from "../../store/actions/onboardingActions"
import { updateOnboardingStatus } from "../../store/actions/authActions"

// Mapping
const mapStateToProps = state => {
    return {
        onboarding: state.onboarding,
        user_id: state.auth.user._id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateBio: (user_id, newBio) => dispatch(updateBio(user_id, newBio)),
        updateBusiness: (user_id, newBusinessDesc) =>
            dispatch(updateBusiness(user_id, newBusinessDesc)),
        prevStage: () => dispatch(prevStage()),
        nextStage: () => dispatch(nextStage()),
        finishOnboarding: user_id => dispatch(finishOnboarding(user_id)),
        updateOnboardingStatus: () => dispatch(updateOnboardingStatus())
    }
}

// Export
const OnboardingContentSeekerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OnboardingContentSeekerComponent)
export default OnboardingContentSeekerContainer
