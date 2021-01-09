import {Switch, Route} from 'react-router-dom'


//Component Imports
import Search from './components/Search'
import SearchDetail from './components/SearchDetail'
// import New from "./components/New"
import Home from './components/Home'
import About from './components/About'

//HOC which wraps around other components
import Layout from './components/common/Layout'
import Login from './components/Login'
import Signup from './components/Signup'

// Admin Components
import Admin from './components/Admin'
import UserDetail from './components/UserDetail'

// Dashboard
import Dashboard from './components/Dashboard'

// --- TEST COMPONENTS --- //
import Profile from './components/Profile'

//CSS imports
import './css/App.css';
import './css/site.css';
import './css/Signup.css';
import './css/Login.css';
import './css/Home.css';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path='/search' component={Search}/>
        <Route exact path='/search/:id' component={SearchDetail} />
        <Route exact path={['/','/home']} component={Home}/>
        <Route exact path='/about' component={About} />
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Signup}/>
        <Route exact path='/admin' component={Admin} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/admin/users/:id' component={UserDetail} />
      </Switch>
    </Layout>
  );
};

export default App;