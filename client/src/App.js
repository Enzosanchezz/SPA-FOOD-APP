import './App.css';
import{BrowserRouter, Route, Switch} from "react-router-dom"
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import Details from './components/Details/Details';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      {/* <h1>Mi cocina 👨🏻‍🍳</h1> */}
    <Switch>
      <Route path="/" exact component={LandingPage}></Route>
      <Route exact path="/home" component={Home}></Route>
      <Route path="/home/:id" component={Details}></Route>
      <Route path="/recipes" component={CreateRecipe}></Route>
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
