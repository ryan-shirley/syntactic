import React from 'react';  
import { Route } from 'react-router-dom';  
  
const AppLayout = ({component, path}) => {  
    return (  
        <div>
            This is the app layout.

            <Route path={path} component={component}/>
        </div>
    )  
} 
  
export default AppLayout;  