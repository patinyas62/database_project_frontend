import './App.css';
import {useState} from 'react'
import { Route, Switch, BrowserRouter as Router,useLocation } from 'react-router-dom'
import Dashboard from './component/Dahsboard/Dashboard';
import email from './component/email/email';
import user_dashboard from './component/User_dashboard/user_dashboard';
import Navbar from './component/Navbar/Navbar';
import route from './component/route'
function App() {
  
  return (
    <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={email} />
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/user" component={user_dashboard}/>
          </Switch>
          
        </div>
    </Router>
  );
}

export default App;
// location.pathname