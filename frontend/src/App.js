import React from 'react';
import './App.css';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Feed from './components/Feed';
import Profile from './components/Profile';
import AuthProvider from './providers/AuthProvider';
import { AuthRoute, ProtectedRoute } from './util/routesUtil';
import { Switch } from 'react-router-dom';
import Upload from './components/Upload';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Switch>
          <AuthRoute exact path={"/"}>
            <LogIn/>
          </AuthRoute>
          <AuthRoute exact path={"/signup"}>
            <SignUp/>
          </AuthRoute>
          <ProtectedRoute exact path={"/home"}>
            <Feed/>
          </ProtectedRoute>
          <ProtectedRoute exact path={"/upload"}>
            <Upload/>
          </ProtectedRoute>
          <ProtectedRoute exact path={"/profile/:userProf"}>
            <Profile/>
          </ProtectedRoute>
        </Switch>
      </AuthProvider>
    </div>
  );
}

export default App;
