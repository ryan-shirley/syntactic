import { connect } from "react-redux"
import EditProfileComponent from "./EditProfileComponent"

// Actions
import { updateUser } from "../../store/actions/authActions"

// Mapping
const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateUser: userDTO => dispatch(updateUser(userDTO))
    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileComponent)
