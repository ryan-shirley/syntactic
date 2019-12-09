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
            <>
                <div className="card shadow">
                    <h3 className="card-header">
                        All Categories
                        <span className="float-right">
                            <Button displayStyle="primary" path="/addText">
                                Add text
                            </Button>
                        </span>
                    </h3>

                    <table className="table table-hover mb-0">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col" style={{width: '20%'}}>Name</th>
                                <th scope="col" style={{width: '50%'}}>Parent</th>
                                <th scope="col">Confidence</th>
                                <th scope="col">Articles Written</th>
                                <th scope="col">Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.categories.map(cat => (
                                <tr key={cat.name}>
                                    <th scope="row">{cat.name}</th>
                                    <td>
                                        {typeof cat._parent_category_id ===
                                        "object"
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default WriterHome
