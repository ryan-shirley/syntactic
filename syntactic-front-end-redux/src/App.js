import React, { Component } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Sidebar from "./components/layout/Sidebar"
import Home from "./components/pages/Home"
import Dashboard from "./components/dashboard/Dashboard"
import CategoryDetails from "./components/categories/CategoryDetails"
import SignIn from "./components/auth/SignIn"
import SignUp from "./components/auth/SignUp"
import CreateCategory from "./components/categories/CreateCategory"
import NotFound404 from "./components/pages/NotFound404"
import "./App.css"

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <Navbar />

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-2 col-lg-1 bg-dark pt-5">
                                <Sidebar />
                            </div>
                            <div className="col-md-10 col-lg-11 pt-5">
                                <Switch>
                                    <Route
                                        exact
                                        path="/"
                                        component={Home}
                                    />
                                    <Route
                                        path="/dashboard"
                                        component={Dashboard}
                                    />
                                    {/* <Route
                                        path="/category/:id"
                                        component={CategoryDetails}
                                    /> */}
                                    <Route path="/signin" component={SignIn} />
                                    <Route path="/signup" component={SignUp} />
                                    {/* <Route
                                        path="/create"
                                        component={CreateCategory}
                                    /> */}
                                    <Route path="*" component={NotFound404} />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            </BrowserRouter>
        )
    }
}

export default App
