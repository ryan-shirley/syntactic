import React from 'react';  

// Layout
import AppLayout from './layouts/AppLayout'
import FullLayout from './layouts/FullLayout'
  
const LayoutManager = ({path, page, layout, exact }) => {  
    
    if(layout === 'app') {
        return <AppLayout path={path} component={page} exact={exact}  />
    }
    else if(layout === 'full') {
        return <FullLayout path={path} component={page} exact={exact} />
    }
    else {
        return 'This layout does not exist.'
    }

};  
  
export default LayoutManager; 