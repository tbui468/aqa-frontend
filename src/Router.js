import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './router.css';

import Main from './Main';
import QuestionIndex from './QuestionIndex';
import QuestionDetail from './QuestionDetail';
import Profile from './Profile';
import NavBar from './NavBar';
import Footer from './Footer';


const Router = (props) => {
    return (
        <BrowserRouter>
            <NavBar user={props.user} login={props.login} logout={props.logout} />
            <Switch>
                <Route exact path="/">
                    <Main toggleOverlay={props.toggleOverlay} />
                </Route>
                <Route exact path="/questions">
                    <QuestionIndex toggleOverlay={props.toggleOverlay} user={props.user} />
                </Route>
                <Route exact path="/questions/:question_id">
                    <QuestionDetail toggleOverlay={props.toggleOverlay} user={props.user} />
                </Route>
                <Route exact path="/profile">
                    <Profile user={props.user} toggleOverlay={props.toggleOverlay} />
                </Route>
            </Switch>
            <Footer />
        </BrowserRouter>
    );
};

export default Router;
