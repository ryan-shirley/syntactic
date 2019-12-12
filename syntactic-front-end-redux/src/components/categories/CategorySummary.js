import React from "react"

const CategorySummary = ({ category }) => {
    return (
        <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title ">{category.name}</span>
                {category._parent_category_id &&
                    "Parent Category: " + category._parent_category_id.name}
                {/* <p className="grey-text">3rd September, 2am</p> */}
            </div>
        </div>
    )
}

export default CategorySummary
