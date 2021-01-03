import {Switch, Route} from 'react-router-dom'

//Component Imports
import Home from "./components/Home"
import Search from "./components/Search"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import Signup from "./components/Signup"
// import New from "./components/New"
//HOC which wraps around other components
import Layout from "./components/common/Layout"

//CSS imports
import './css/App.css';
import './css/Layout.css';
import './css/site.css';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/search" component={Search}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path={"/login"} component={Login} />
        <Route exact path={"/register"} component={Signup} />

      </Switch>
    </Layout>
  );
};

export default App;
