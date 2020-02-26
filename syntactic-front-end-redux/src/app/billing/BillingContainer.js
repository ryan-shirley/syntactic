// Redux
import { connect } from "react-redux"

// Components
import BillingListComponent from "./BillingListComponent"

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
        getAllPayments: () => dispatch(getAllPayments())
    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(BillingListComponent)