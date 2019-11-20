import React from 'react';  
import { Route } from 'react-router-dom';  
  
const FullLayout = ({component, path}) => {  
    return (  
        <div>
            This is the full layout.

            <Route path={path} component={component}/>
        </div>
    )  
} 
  
export default FullLayout;  