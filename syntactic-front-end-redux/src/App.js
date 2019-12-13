import React from 'react';
import Routes from './Routes'
import { BrowserRouter } from "react-router-dom"
import "./App.css"

function App() {
    return (
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    );
}

// class App extends Component {
//     render() {
//         return (
//             <BrowserRouter>
//                 <React.Fragment>
//                     <Navbar />

//                     <div className="container-fluid">
//                         <div className="row">
//                             <div className="col-md-2 col-lg-1 bg-primary-dark pt-5">
//                                 <Sidebar />
//                             </div>
//                             <div className="col-md-10 col-lg-11 pt-5">
//                                 <Switch>
//                                     <Route
//                                         exact
//                                         path="/"
//                                         component={Home}
//                                     />
//                                     <Route
//                                         path="/dashboard"
//                                         component={Dashboard}
//                                     />
//                                     <Route
//                                         path="/levels"
//                                         component={Levels}
//                                     />
//                                     {/* <Route
//                                         path="/category/:id"
//                                         component={CategoryDetails}
//                                     /> */}
//                                     <Route path="/signin" component={SignIn} />
//                                     <Route path="/signup" component={SignUp} />
//                                     {/* <Route
//                                         path="/create"
//                                         component={CreateCategory}
//                                     /> */}
//                                     <Route path="*" component={NotFound404} />
//                                 </Switch>
//                             </div>
//                         </div>
//                     </div>
//                 </React.Fragment>
//             </BrowserRouter>
//         )
//     }
// }

export default App
