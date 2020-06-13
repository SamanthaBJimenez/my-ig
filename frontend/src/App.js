import React from 'react';
import './App.css';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Feed from './components/Feed';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <Switch> */}
          <Route exact path={"/"}>
            <LogIn/>
          </Route>
          <Route exact path={"/signup"}>
            <SignUp/>
          </Route>
          {/* <Route exact path={"/home"}>
            <Feed/>
          </Route> */}
          {/* <Route exact path={"/upload"}>
            <Upload/>
          </Route> */}
          {/* <Route exact path={"/profile"}>
            <Profile/>
          </Route> */}
        {/* </Switch> */}
    </div>
  );
}

export default App;
