import React from 'react';
import { Route } from 'react-router-dom';
import Home from './componente/Home';
import Landing from './componente/LandingPage';
import Detail from './componente/Detail';
import Create from './componente/Create';

import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Landing}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/detail' component={Detail}/>
      <Route exact path='/create' component={Create}/>

    </div>
  );
}

export default App;
