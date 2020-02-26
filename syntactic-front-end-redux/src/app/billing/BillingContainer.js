// Redux
import { connect } from "react-redux"

// Components
import BillingListComponent from "./BillingListComponent"

// Mapping
const mapStateToProps = state => {
    return {
        levels: state.auth.user.levels
    }
}

// Export
export default connect(mapStateToProps)(BillingListComponent)
