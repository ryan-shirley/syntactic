import React from 'react';

class TextArea extends React.PureComponent {
    render() {
        return (
            <div className="form-group">
                {this.props.label && <label htmlFor={this.props.label}>{this.props.label}</label>}
                <textarea className="form-control" rows="3" value={this.props.value} onChange={(e) => this.props.handleChange(this.props.field, e)} ></textarea>
                {this.props.error && <span className="badge badge-danger">{this.props.error}</span>}
            </div>
        )
    }
}

export { TextArea }