import {Switch, Route} from 'react-router-dom'

//Component Imports
import Home from "./components/Home"
import Search from "./components/Search"
// import New from "./components/New"
//HOC which wraps around other components
import Layout from "./components/common/Layout"

//CSS imports
import './css/App.css';
import './css/site.css';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/search" component={Search}/>
      </Switch>
    </Layout>
  );
};

export default App;
