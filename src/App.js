import {Switch, Route} from 'react-router-dom'


//Component Imports
import Home from "./components/Home"
import About from './components/About'
//HOC which wraps around other components
import Layout from "./components/common/Layout"
import Login from './components/Login'
import Signup from './components/Signup'

// Admin Components
import Admin from './components/Admin'

// Dashboard
import Dashboard from './components/Dashboard'

//CSS imports
import './css/App.css';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path={["/","/home"]} component={Home}/>
        <Route exact path='/about' component={About} />
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Signup}/>
        <Route exact path='/admin' component={Admin} />
        <Route exact path='/dashboard' component={Dashboard} />
      </Switch>
    </Layout>
  );
};

export default App;
