import './App.css';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './componets/LandingPage';
import Home from './componets/Home';
import DogCreate from './componets/DogCreate';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route path='/' exact component={LandingPage}></Route>
        <Route path='/home' exact component={Home}></Route>
        <Route path='/newdog' exact component={DogCreate}></Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
