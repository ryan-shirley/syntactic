import React from 'react';

class TextArea extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: this.props.value,
            label: this.props.label
        }
    }

    /**
     * getDerivedStateFromProps() Update value with new props
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            value: nextProps.value,
        };
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.state.label}>{this.state.label}</label>
                <textarea className="form-control" rows="3" value={this.state.value} onChange={(e) => this.props.handleChange(this.props.field, e)}  ></textarea>
            </div>
        )
    }
}

export { TextArea }