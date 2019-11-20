import React from 'react';  
import { Route } from 'react-router-dom';  
  
const FullLayout = ({component, path}) => {  
    return <Route path={path} component={component}/>
} 
  
export default FullLayout;  