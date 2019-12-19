import React from "react"
import { Link } from "react-router-dom"

const CategoryList = ({ categories }) => {
    return (
        <div className="card shadow">
            <h3 className="card-header">
                All Categories - Levels
                <Link
                    to="/add-content"
                    className="btn btn-primary float-right"
                    role="button"
                    aria-disabled="true"
                >
                    Add Content
                </Link>
            </h3>

            <table className="table table-hover mb-0">
                <thead className="thead-light">
                    <tr>
                        <th scope="col" style={{ width: "20%" }}>
                            Name
                        </th>
                        <th scope="col" style={{ width: "50%" }}>
                            Parent
                        </th>
                        <th scope="col">Confidence</th>
                        <th scope="col">Articles Written</th>
                        <th scope="col">Level</th>
                    </tr>
                </thead>
                <tbody>
                    {categories &&
                        categories.map(cat => (
                            <>
                                <tr key={cat._id}>
                                    <th scope="row">{cat.name}</th>
                                    <td>
                                        {typeof cat._parent_category_id === "object"
                                            ? cat._parent_category_id.name
                                            : "–"}
                                    </td>
                                    <td>
                                        {cat.users.length !== 0
                                            ? (
                                                cat.users[0].confidence /
                                                cat.users[0].articles_written
                                            ).toFixed(2) *
                                                100 +
                                            "%"
                                            : "–"}
                                    </td>
                                    <td>
                                        {cat.users.length !== 0
                                            ? cat.users[0].articles_written
                                            : "–"}
                                    </td>
                                    <td>–</td>
                                </tr>
                                {cat.sub_category && (
                                    <tr key={cat.sub_category._id}>
                                        <th scope="row">{cat.sub_category.name}</th>
                                        <td>
                                            {cat.name}
                                        </td>
                                        <td>
                                            {cat.sub_category.users.length !== 0
                                                ? (
                                                    cat.sub_category.users[0].confidence /
                                                    cat.sub_category.users[0].articles_written
                                                ).toFixed(2) *
                                                    100 +
                                                "%"
                                                : "–"}
                                        </td>
                                        <td>
                                            {cat.sub_category.users.length !== 0
                                                ? cat.sub_category.users[0].articles_written
                                                : "–"}
                                        </td>
                                        <td>–</td>
                                    </tr>
                                )}
                                {cat.sub_category && cat.sub_category.sub_category && (
                                    <tr key={cat.sub_category.sub_category._id}>
                                        <th scope="row">{cat.sub_category.sub_category.name}</th>
                                        <td>
                                            {cat.sub_category.name}
                                        </td>
                                        <td>
                                            {cat.sub_category.sub_category.users.length !== 0
                                                ? (
                                                    cat.sub_category.sub_category.users[0].confidence /
                                                    cat.sub_category.sub_category.users[0].articles_written
                                                ).toFixed(2) *
                                                    100 +
                                                "%"
                                                : "–"}
                                        </td>
                                        <td>
                                            {cat.sub_category.sub_category.users.length !== 0
                                                ? cat.sub_category.sub_category.users[0].articles_written
                                                : "–"}
                                        </td>
                                        <td>–</td>
                                    </tr>
                                )}
                            </>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default CategoryList
