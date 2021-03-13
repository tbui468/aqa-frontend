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
    /*

    useEffect(() => {
        fetch('http://localhost:3000/profile', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })
            .then((result) => {
                return result.json(); //why is this this necessary? (Why can't it be combined with the next step?)
            })
            .then((user) => {
                if (user) {
                    setUser({
                        username: user.user_name,
                        email: user.user_email,
                    });
                }
            });
    },[]);*/


    return (
        <BrowserRouter>
            <NavBar user={props.user} login={props.login} logout={props.logout} />
            <Switch>
                <Route exact path="/">
                    <Main toggleOverlay={props.toggleOverlay} />
                </Route>
                <Route exact path="/questions">
                    <QuestionIndex toggleOverlay={props.toggleOverlay} />
                </Route>
                <Route exact path="/questions/:question_id">
                    <QuestionDetail toggleOverlay={props.toggleOverlay} />
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
