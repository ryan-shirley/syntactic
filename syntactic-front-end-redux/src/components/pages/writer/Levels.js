import React, { Component } from "react"
import { fetchCategories } from "../../../store/actions/categoryActions"
import CategoryList from "../../categories/CategoryList"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

class Levels extends Component {
    componentDidMount() {
        const { auth } = this.props
        
        if (!auth.uid) return <Redirect to="/signin" />

        console.log("Conponent did mount")
        this.props.dispatch(fetchCategories())
    }

    render() {
        const { auth, categories } = this.props
        if (!auth.uid) return <Redirect to="/signin" />

        return (
            <div>
                <CategoryList categories={categories} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    // console.log(state);
    return {
        categories: state.category.categories,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Levels)
