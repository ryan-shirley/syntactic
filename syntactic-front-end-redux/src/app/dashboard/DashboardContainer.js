// React
import React, { Component } from "react"

// Redux
import { connect } from "react-redux"

// API
import API from "../../utils/API"

// Components
import StatsList from "../components/StatsList"
import Error from "../components/Error"
import ProjectsListTable from "../components/projects/ProjectsListTable"
import DataLoading from "../components/DataLoading"

// Fonts
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faThumbtack,
    faReceipt,
    faEnvelopeOpenText,
    faWallet,
    faCalendarCheck
} from "@fortawesome/free-solid-svg-icons"

class DashboardContainer extends Component {
    constructor() {
        super()

        this.state = {
            stats: [],
            projects: {
                invitationPending: [],
                dueSoon: []
            },
            error: {},
            loading: false
        }
    }
    /**
     * componentDidMount() Load data
     */
    componentDidMount() {
        this.setState({ loading: true })

        API.get("/dashboard")
            .then(data => {
                let role = this.props.role

                // Stats List
                let stats =
                    role === "writer"
                        ? [
                              {
                                  colour: "primary",
                                  icon: <FontAwesomeIcon icon={faThumbtack} />,
                                  title: "Active projects",
                                  number: data.stats.activeProjects
                              },
                              {
                                  colour: "warning",
                                  icon: (
                                      <FontAwesomeIcon
                                          icon={faEnvelopeOpenText}
                                      />
                                  ),
                                  title: "Invitations",
                                  number: data.stats.invitationPending
                              },
                              {
                                  colour: "success",
                                  icon: (
                                      <FontAwesomeIcon icon={faCalendarCheck} />
                                  ),
                                  title: "Completed projects",
                                  number: data.stats.completedProjects
                              },
                              {
                                  colour: "orange",
                                  icon: <FontAwesomeIcon icon={faWallet} />,
                                  title: "Total Earnings",
                                  number: "€" + data.stats.billing
                              }
                          ]
                        : [
                              {
                                  colour: "primary",
                                  icon: <FontAwesomeIcon icon={faThumbtack} />,
                                  title: "Active projects",
                                  number: data.stats.activeProjects
                              },
                              {
                                  colour: "warning",
                                  icon: (
                                      <FontAwesomeIcon
                                          icon={faEnvelopeOpenText}
                                      />
                                  ),
                                  title: "Pending Invites",
                                  number: data.stats.invitationPending
                              },
                              {
                                  colour: "success",
                                  icon: (
                                      <FontAwesomeIcon icon={faCalendarCheck} />
                                  ),
                                  title: "Completed projects",
                                  number: data.stats.completedProjects
                              },
                              {
                                  colour: "orange",
                                  icon: <FontAwesomeIcon icon={faReceipt} />,
                                  title: "Total Spent",
                                  number: "€" + data.stats.billing
                              }
                          ]

                // Update state
                this.setState({
                    stats,
                    projects: data.projects,
                    loading: false
                })
            })
            .catch(error => this.setState({ error }))
    }

    render() {
        let { stats, error, projects, loading } = this.state

        if (loading) {
            return <DataLoading />
        }

        return (
            <section className="dashboard">
                {error.code && <Error error={error} />}

                <StatsList stats={stats} />

                {projects.invitationPending.length ? (
                    <section className="project-list">
                        <h3>Invitations</h3>
                        <ProjectsListTable
                            projects={projects.invitationPending}
                            isWriter={this.props.role === "writer"}
                        />
                    </section>
                ) : (
                    ""
                )}

                {projects.dueSoon.length ? (
                    <section className="project-list">
                        <h3>Projects Due Soon</h3>
                        <ProjectsListTable
                            projects={projects.dueSoon}
                            isWriter={this.props.role === "writer"}
                        />
                    </section>
                ) : (
                    ""
                )}
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        role: state.auth.user.role[0].name
    }
}

export default connect(mapStateToProps)(DashboardContainer)
