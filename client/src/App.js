import React from 'react';
import { Route } from 'react-router-dom';
import Landing from './componente/LandingPage/LandingPage';
import Detail from './componente/Detail/Detail';
import Create from './componente/Create/Create';

import './App.css';
import AddFilters from './componente/AddFilters';
function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Landing}/>
      <Route exact path='/home' component={AddFilters}/>
      <Route exact path='/detail/:id' component={Detail}/>
      <Route exact path='/create' component={Create}/>

    </div>
  );
}

export default App;
