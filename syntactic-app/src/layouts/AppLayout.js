import React from 'react';  
import { Route } from 'react-router-dom';  

import Navbar from '../components/Navbar'
  
const AppLayout = ({component, path, exact}) => {  

    let page = exact ? <Route exact path={path} component={component}/> : <Route path={path} component={component}/>

    return (  
        <div>
            <Navbar />
            
            <div className="container mt-5">
                This is the app layout. <br />

                {page}
            </div>
        </div>
    )  
} 
  
export default AppLayout;  