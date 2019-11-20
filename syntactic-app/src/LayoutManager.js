import React from 'react';  

// Layout
import AppLayout from './layouts/App'
  
const LayoutManager = ({path, page, layout}) => {  

    if(layout === 'app') {
        return <AppLayout path={path} component={page} />
    }
    else if(layout === 'nav-only') {
        return 'nav only layout'
    }
    else {
        return 'This layout does not exist.'
    }

};  
  
export default LayoutManager; 