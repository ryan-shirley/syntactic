import React, { Component } from "react"
import {
    Button,
    Col,
    Card,
    Image,
    Badge,
    Popover,
    OverlayTrigger
} from "react-bootstrap"

export default class UserInvite extends Component {
    render() {
        let { writer, writersList } = this.props

        // All categories from project
        let categories = writersList.recommended.categories.concat(
            writersList.relevant.categories,
            writersList.others.categories
        )

        // Get categories writer matched to project
        let matchedCategories = []
        for (let i = 0; i < categories.length; i++) {
            let category = categories[i]

            for (let j = 0; j < writer.user.levels.length; j++) {
                let writerCat = writer.user.levels[j]

                if (category === writerCat.category) {
                    matchedCategories.push(writerCat)
                }
            }
        }

        // Configure popover
        const popover = (
            <Popover className="writer-popover">
                <Popover.Content>
                    <h6>About Me</h6>
                    <p>{writer.user.profile.bio}</p>

                    <h6>Matched Categories</h6>
                    {matchedCategories.map(cat => (
                        <Badge pill variant="secondary" key={cat._id}>
                            {cat.category} - Lv {cat.level}
                        </Badge>
                    ))}
                </Popover.Content>
            </Popover>
        )

        return (
            <Col sm={3}>
                <OverlayTrigger
                    trigger="hover"
                    placement="right"
                    overlay={popover}
                >
                    <Card body className="writer">
                        <Image
                            src="/img/profile.jpg"
                            className="profile rounded-circle img-fluid"
                            width="80"
                            height="80"
                            alt={
                                writer.user.first_name +
                                " " +
                                writer.user.last_name
                            }
                        />
                        <p className="name">
                            {writer.user.first_name +
                                " " +
                                writer.user.last_name}{" "}
                            <span className="location">New York, NY*</span>
                        </p>

                        <p>
                            {matchedCategories.slice(0, 2).map(cat => (
                                <Badge
                                    pill
                                    variant="secondary"
                                    className="mr-1"
                                    key={cat._id}
                                >
                                    {cat.category} - Lv {cat.level}
                                </Badge>
                            ))}
                            {matchedCategories.length > 2 && (
                                <Badge
                                    pill
                                    variant="secondary"
                                    className="mr-1"
                                >
                                    + {matchedCategories.length - 2} more
                                </Badge>
                            )}
                        </p>
                        <Button
                            block
                            variant="primary"
                            onClick={() =>
                                this.props.onInviteClick(writer.user._id)
                            }
                        >
                            Invite
                        </Button>
                    </Card>
                </OverlayTrigger>
            </Col>
        )
    }
}
