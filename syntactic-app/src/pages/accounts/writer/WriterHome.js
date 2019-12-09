import React from "react"
import Button from "../../../components/Button"

class WriterHome extends React.Component {
    constructor() {
        super()

        this.state = {
            categories: []
        }
    }

    /**
     * componentDidMount() Get categories for user
     */
    componentDidMount() {
        console.log('Getting categories');
        
        fetch(
            "http://localhost:4444/users/writer/5dd92e71e5cfa00b6e369d52/categories",
            {
                method: "GET"
            }
        )
            .then(res => res.json()) // Parse output to json
            .then(data => {
                this.setState({
                    categories: data.categories
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <p>Display account details here</p>

                <p>All categories</p>
                <ul className="list-group">
                    {this.state.categories.map(cat => (
                        <li className="list-group-item">
                            {cat.name}
                            <br />
                            {cat.users.map(
                                user =>
                                    user && (
                                        <>
                                            <button
                                                type="button"
                                                className="btn btn-primary mb-1"
                                                key={cat.name + '-articles_written'}
                                            >
                                                Articles Written
                                                <span className="badge badge-light ml-2">
                                                    {user.articles_written}
                                                </span>
                                            </button> 

                                            <br />

                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                key={cat.name + '-confidence'}
                                            >
                                                Confidence
                                                <span className="badge badge-light ml-2">
                                                    {user.confidence / user.articles_written}
                                                </span>
                                            </button>
                                        </>
                                    )
                            )}
                        </li>
                    ))}
                </ul>

                <br />

                <Button displayStyle="primary" path="/addText">
                    Add text
                </Button>
            </div>
        )
    }
}

export default WriterHome
