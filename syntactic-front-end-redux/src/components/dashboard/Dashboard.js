import React, { Component } from "react"
import { fetchCategories } from "../../store/actions/categoryActions"
import CategoryList from "../categories/CategoryList"
import Notifications from "./Notifications"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

class Dashboard extends Component {
    componentDidMount() {
        const { auth } = this.props
        if (!auth.uid) return <Redirect to="/signin" />

        console.log('Conponent did mount');
        this.props.dispatch(fetchCategories());
    }

    render() {
        const { categories } = this.props

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <h4>Category List</h4>
                        <CategoryList categories={categories} />
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications />
                    </div>
                </div>
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

export default connect(mapStateToProps)(Dashboard)
