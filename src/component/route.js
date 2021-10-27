import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import Dashboard from './Dahsboard/Dashboard';
import email from './email/email';
import Navbar from './Navbar/Navbar';

function App() {
  return (
    <Router>
        <div className="App">
            <Navbar />
          <Switch>
            <Route exact path="/" component={email} />
            {/* <Route path="/home" component={Navbar}/> */}
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
    </Router>
  );
}

export default App;
