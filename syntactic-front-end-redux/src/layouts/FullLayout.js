import React from 'react';  
import { Route } from 'react-router-dom';  
  
const FullLayout = ({component, path}) => {  
    return (
        <div className="container">
            <Route path={path} component={component}/>
        </div>
    )
} 
  
export default FullLayout;  