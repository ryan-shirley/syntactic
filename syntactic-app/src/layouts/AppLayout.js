import React from 'react';  
import { Route } from 'react-router-dom';  
  
const AppLayout = ({component, path, exact}) => {  

    let page = exact ? <Route exact path={path} component={component}/> : <Route path={path} component={component}/>

    return (  
        <div>
            This is the app layout.

            {page}
        </div>
    )  
} 
  
export default AppLayout;  