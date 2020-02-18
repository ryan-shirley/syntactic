import React, { Component } from "react"
import { Button } from "react-bootstrap"

export default class UserInvite extends Component {
    render() {
        let { writer, categories } = this.props

        return (
            <tr key={writer.user._id}>
                <td>{writer.user.first_name + " " + writer.user.last_name}</td>
                <td>{writer.articles_written}</td>
                <td><Button onClick={() => this.props.onInviteClick(writer.user._id)}>Invite</Button></td>
            </tr>
        )
    }
}
