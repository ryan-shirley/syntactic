import React from "react"
import { Route } from "react-router-dom"

const FullLayout = ({ component, path, children }) => {
    return (
        <div className="container">
            <Route path={path} component={component} />

            {children.length &&
                children.map(childRoute => (
                    <Route
                        key={`${path}${childRoute.path}`}
                        path={`${path}${childRoute.path}`}
                        component={childRoute.page}
                    />
                ))}
        </div>
    )
}

export default FullLayout
