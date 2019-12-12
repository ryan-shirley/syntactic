import React from "react"
import CategorySummary from "./CategorySummary"
import { Link } from "react-router-dom"

const CategoryList = ({ categories }) => {
    return (
        <div className="project-list section">
            {categories &&
                categories.map(category => {
                    return (
                        <Link
                            to={"/category/" + category._id}
                            key={category._id}
                        >
                            <CategorySummary category={category} />
                        </Link>
                    )
                })}
        </div>
    )
}

export default CategoryList
