import React from 'react';
import './App.css';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Feed from './components/Feed';
import Profile from './components/Profile';
// import { Route } from 'react-router-dom';
import AuthProvider from './providers/AuthProvider';
import { AuthRoute, ProtectedRoute } from './util/routesUtil';

function App() {
  return (
    <div className="App">
      <AuthProvider>
          <AuthRoute exact path={"/"}>
            <LogIn/>
          </AuthRoute>
          <AuthRoute exact path={"/signup"}>
            <SignUp/>
          </AuthRoute>
          <ProtectedRoute exact path={"/home"}>
            <Feed/>
          </ProtectedRoute>
          {/* <Route exact path={"/upload"}>
            <Upload/>
          </Route> */}
          <ProtectedRoute exact path={"/profile"}>
            <Profile/>
          </ProtectedRoute>
      </AuthProvider>
    </div>
  );
}

export default App;
