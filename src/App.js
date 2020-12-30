import {Switch, Route} from 'react-router-dom'

//Component Imports
import Home from "./components/Home"
//HOC which wraps around other components
import Layout from "./components/common/Layout"

//CSS imports
import './css/App.css';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home}/>
      </Switch>
    </Layout>
  );
};

export default App;
