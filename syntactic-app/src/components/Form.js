import React from 'react';

class TextArea extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: this.props.value,
            label: this.props.label,
            error: this.props.error
        }
    }

    /**
     * getDerivedStateFromProps() Update value with new props
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            value: nextProps.value,
            error: nextProps.error
        };
    }

    render() {
        return (
            <div className="form-group">
                {this.state.label && <label htmlFor={this.state.label}>{this.state.label}</label>}
                <textarea className="form-control" rows="3" value={this.state.value} onChange={(e) => this.props.handleChange(this.props.field, e)} ></textarea>
                {this.state.error && <span className="badge badge-danger">{this.state.error}</span>}
                
            </div>
        )
    }
}

export { TextArea }