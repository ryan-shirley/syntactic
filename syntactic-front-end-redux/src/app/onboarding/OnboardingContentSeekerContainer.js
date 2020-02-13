// Redux
import { connect } from "react-redux"

// Presentational omponent
import OnboardingContentSeekerComponent from "./OnboardingContentSeekerComponent"

// Actions
import {
    updateBio,
    updateBusiness,
    moveStage,
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
        nextStage: () => dispatch(moveStage(1)),
        prevStage: () => dispatch(moveStage(-1)),
        updateBio: (user_id, newBio) => dispatch(updateBio(user_id, newBio)),






        


        // updateBusiness: (user_id, newBusinessDesc) =>
        //     dispatch(updateBusiness(user_id, newBusinessDesc)),
        // finishOnboarding: user_id => dispatch(finishOnboarding(user_id)),
        // updateOnboardingStatus: () => dispatch(updateOnboardingStatus())
    }
}

// Export
const OnboardingContentSeekerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OnboardingContentSeekerComponent)
export default OnboardingContentSeekerContainer
