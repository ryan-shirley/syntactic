// Redux
import { connect } from "react-redux"

// Components
import BillingComponent from "./BillingComponent"

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
        getAllPayments: () => dispatch(getAllPayments()),
        setPaymentBeingPayed: payment => dispatch({ type: "SET_PAYMENT_BEING_PAYED", payload: payment })
    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(BillingComponent)