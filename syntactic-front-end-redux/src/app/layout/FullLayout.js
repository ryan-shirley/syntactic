import React from "react"
import { Route } from "react-router-dom"

const FullLayout = ({ component, path, children, isExact }) => {
    let childRoutes =
        children &&
        children.length &&
        children.map(childRoute => (
            <Route
                key={`${path}${childRoute.path}`}
                path={`${path}${childRoute.path}`}
                component={childRoute.page}
            />
        ))

    let rootChild =
        children &&
        children.length &&
        children.find(childRoute => {
            return childRoute.showOnRoot === true && childRoute.page
        })

        rootChild = rootChild && isExact && <Route path="/" component={rootChild.page} />

    return (
        <div className="container">
            <Route path={path} component={component} />

            {rootChild}
            {childRoutes}
        </div>
    )
}

export default FullLayout
