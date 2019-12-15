import React, { Component } from "react"
import { fetchCategories } from "../../../store/actions/categoryActions"
import CategoryList from "../../categories/CategoryList"
import { connect } from "react-redux"

class Levels extends Component {
    componentDidMount() {
        this.props.dispatch(fetchCategories())
    }

    render() {
        const { categories } = this.props

        return (
            <div>
                <CategoryList categories={categories} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        categories: state.category.categories
    }
}

export default connect(mapStateToProps)(Levels)
