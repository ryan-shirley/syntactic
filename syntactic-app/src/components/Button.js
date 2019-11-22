import React from 'react';
import { Link } from 'react-router-dom';

class Button extends React.Component {
    render() {
        let props = this.props

        // Button with onClick callback or link to page
        if(props.onClick) {
            return <button
            type="button"
            className={ "btn btn-" + props.displayStyle + (props.classes ?  " " + props.classes : '')}
            onClick={props.onClick}>{props.children}</button>
        }
        else if(props.path) {
            return (
                <Link 
                to={{
                    pathname: props.path,
                    state: props.state
                }}
                className={"btn btn-" + props.displayStyle + (props.classes ?  " " + props.classes : '')}
                role="button"
                aria-disabled="true">{props.children}</Link>
            )
        }
        
    }
}

export default Button