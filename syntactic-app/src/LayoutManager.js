import React from 'react';  

// Layout
import AppLayout from './layouts/App'
import FullLayout from './layouts/Full'
  
const LayoutManager = ({path, page, layout}) => {  

    if(layout === 'app') {
        return <AppLayout path={path} component={page} />
    }
    else if(layout === 'full') {
        return <FullLayout path={path} component={page} />
    }
    else {
        return 'This layout does not exist.'
    }

};  
  
export default LayoutManager; 