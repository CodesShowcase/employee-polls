import './App.css';
import React, { useEffect, Fragment } from 'react';
import { connect } from "react-redux";
//import { Navigate } from 'react-router-dom';
import Navigation from './components/Nav/Nav';
import BlankBar from './components/Nav/BlankBar';
import Footer from './components/Nav/Footer';
import Router from './routes/routes';
import Login from './components/Auth/Auth';
import { handleInitialData } from './actions/shared';

const App = (props) => {

useEffect(() => {
  props.dispatch(handleInitialData());
}, [props]);

  return (
    <Fragment>
      <div className="App">
        <Navigation />
        <BlankBar />
        { /* Redirect and forced Element */ }
        {props.login === null ? (<Login />) : (
          <Router />
        )}
        <Footer />
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  login: authedUser,
});

export default connect(mapStateToProps)(App);

// Does somehow now Workflow
// {props.login === true ? (<Fragment><Navigate to='login'/> <Login /></Fragment>) : (
