import React, { Component } from "react"
import { connect } from "react-redux"
import { TextArea } from "../components/Form"
import { analyse } from "../../store/actions/googleNLAPIActions"

class Projects extends Component {
    constructor() {
        super()

        this.state = {
            text: "",
            error: ""
        }

        // Binding this to work in the callback
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    /**
     * handleChange() Updates state from form input change
     */
    handleChange = (field, event) => {
        const target = event.target
        const value = target.value

        this.setState({
            [field]: value
        })
    }

    /**
     * handleSubmit() Submit content to be analysed by Google NL API for Search
     */
    handleSubmit = e => {
        e.preventDefault()
        this.props.analyse(this.state.text)
    }

    render() {
        const { briefResults, completed, processing } = this.props.nlp

        let categoriesMatched = briefResults.analysis
        let results = briefResults.results

        return (
            <>
                <div className="card mb-3">
                    <div className="card-header">Projects</div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <TextArea
                                field="text"
                                value={this.state.text}
                                handleChange={this.handleChange}
                                error={this.props.nlp.error}
                                label="Project Brief"
                            />

                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">Results</div>
                    <div className="card-body">
                        {processing ? (
                            <p>Processing brief..</p>
                        ) : (
                            !completed && (
                                <p>Waiting on brief to be submitted.</p>
                            )
                        )}

                        {completed && (
                            <>
                                <h3>Categories Matched</h3>
                                <ul class="list-group mb-4">
                                    {categoriesMatched.length &&
                                        categoriesMatched.map(category => (
                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                {category.categories}
                                                <span class="badge badge-primary badge-pill ml-3">
                                                    Confidence:{" "}
                                                    {(
                                                        category.confidence *
                                                        100
                                                    ).toFixed(0)}
                                                    %
                                                </span>
                                            </li>
                                        ))}
                                </ul>

                                {results.map(result => (
                                    <>
                                        <h3>
                                            Best Match for{" "}
                                            <span class="badge badge-pill badge-success">
                                                {result.bestMatch.category}
                                            </span>
                                        </h3>

                                        {result.bestMatch.writers.length
                                            ? result.bestMatch.writers.map(
                                                  writer => (
                                                      <span class="badge badge-pill badge-primary">
                                                          {writer.user
                                                              .first_name +
                                                              " " +
                                                              writer.user
                                                                  .last_name}{" "}
                                                          |{" "}
                                                          {
                                                              writer.articles_written
                                                          }{" "}
                                                          articles written
                                                      </span>
                                                  )
                                              )
                                            : "❌ No writers were found."}

                                        <h3>Lower categories</h3>
                                        {result.writersLowerCat.length
                                            ? result.writersLowerCat.map(
                                                  res => (
                                                      <>
                                                          <h3>
                                                              <span class="badge badge-pill badge-success">
                                                                  {res.category}
                                                              </span>
                                                          </h3>

                                                          {res.writers.length
                                                              ? res.writers.map(
                                                                    writer => (
                                                                        <span class="badge badge-pill badge-primary">
                                                                            {writer
                                                                                .user
                                                                                .first_name +
                                                                                " " +
                                                                                writer
                                                                                    .user
                                                                                    .last_name}{" "}
                                                                            |{" "}
                                                                            {
                                                                                writer.articles_written
                                                                            }{" "}
                                                                            articles
                                                                            written
                                                                        </span>
                                                                    )
                                                                )
                                                              : "❌ No writers were found."}
                                                      </>
                                                  )
                                              )
                                            : "❌ No lower categories were found."}

                                        <h3>Same Level 2 categories</h3>
                                        {result.writersSameL2Cat.length
                                            ? result.writersSameL2Cat.map(
                                                  res => (
                                                      <>
                                                          <h3>
                                                              <span class="badge badge-pill badge-success">
                                                                  {res.category}
                                                              </span>
                                                          </h3>

                                                          {res.writers.length
                                                              ? res.writers.map(
                                                                    writer => (
                                                                        <span class="badge badge-pill badge-primary">
                                                                            {writer
                                                                                .user
                                                                                .first_name +
                                                                                " " +
                                                                                writer
                                                                                    .user
                                                                                    .last_name}{" "}
                                                                            |{" "}
                                                                            {
                                                                                writer.articles_written
                                                                            }{" "}
                                                                            articles
                                                                            written
                                                                        </span>
                                                                    )
                                                                )
                                                              : "❌ No writers were found."}
                                                      </>
                                                  )
                                              )
                                            : "❌ No Same level 2 categories were found."}

                                        <h3>Additional relevant categories</h3>
                                        {result.writersAdditionalRelevantCats.length
                                            ? result.writersAdditionalRelevantCats.map(
                                                  res => (
                                                      <>
                                                          <h3>
                                                              <span class="badge badge-pill badge-success">
                                                                  {res.category}
                                                              </span>
                                                          </h3>

                                                          {res.writers.length
                                                              ? res.writers.map(
                                                                    writer => (
                                                                        <span class="badge badge-pill badge-primary">
                                                                            {writer
                                                                                .user
                                                                                .first_name +
                                                                                " " +
                                                                                writer
                                                                                    .user
                                                                                    .last_name}{" "}
                                                                            |{" "}
                                                                            {
                                                                                writer.articles_written
                                                                            }{" "}
                                                                            articles
                                                                            written
                                                                        </span>
                                                                    )
                                                                )
                                                              : "❌ No writers were found."}
                                                      </>
                                                  )
                                              )
                                            : "❌ No additional relevant categories were found."}
                                        <hr />
                                    </>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth.profile,
        nlp: state.nlp
    }
}

const mapDispatchToProps = dispatch => {
    return {
        analyse: text => dispatch(analyse(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)
