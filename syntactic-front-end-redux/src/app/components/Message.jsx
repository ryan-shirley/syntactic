// React
import React from "react"

// Components
import { Badge, Image } from "react-bootstrap"
import Moment from "react-moment"

const Message = props => {
    let { children, message } = props

    let name =
            message.sender_id._id === props.user._id
                ? props.user.first_name + " " + props.user.last_name
                : message.sender_id.first_name +
                  " " +
                  message.sender_id.last_name,
        buttonColour =
            message.sender_id._id === props.user._id ? "primary" : "secondary"

    return (
        <div
            className={
                "message" +
                (message.sender_id._id === props.user._id ? " text-right" : "")
            }
            key={message._id}
        >
            <span className="details">
                <Image
                    src="/img/profile.jpg"
                    className="rounded-circle profile"
                    alt={
                        message.sender_id.first_name +
                        " " +
                        message.sender_id.last_name
                    }
                />
                {name}
                <span className="timestamp">
                    <Moment format="DD MMM - h:mm a">
                        {message.createdAt}
                    </Moment>
                </span>
            </span>
            <div>
                <Badge key={message._id} variant={buttonColour}>
                    {children}
                </Badge>
            </div>
        </div>
    )
}

export default Message
