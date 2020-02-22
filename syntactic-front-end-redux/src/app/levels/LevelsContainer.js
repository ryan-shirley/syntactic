// Redux
import { connect } from "react-redux"

// Components
import LevelsComponent from "./LevelsComponent"

// Mapping
const mapStateToProps = state => {
    return {
        levels: state.auth.user.levels
    }
}

// Export
export default connect(mapStateToProps)(LevelsComponent)
