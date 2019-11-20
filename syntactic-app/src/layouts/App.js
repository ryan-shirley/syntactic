import React from 'react';  
import { Route } from 'react-router-dom';  
  
const AppLayout = ({component, path}) => {  
    let page;

    if(path === '/') {
        page = <Route exact path={path} component={component}/>
    }
    else {
        page = <Route path={path} component={component}/>
    }

    return (  
        <div>
            This is the app layout.

            {page}
        </div>
    )  
} 
  
export default AppLayout;  