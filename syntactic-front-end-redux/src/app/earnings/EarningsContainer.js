// Redux
import { connect } from "react-redux"

// Components
import EarningsComponent from "./EarningsComponent"

// Actions
import { getAllPayments } from "../../store/actions/billingActions"

// Mapping
const mapStateToProps = state => {
    return {
        billing: state.billing
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllEarnings: () => dispatch(getAllPayments()),
    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(EarningsComponent)