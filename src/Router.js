import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import './router.css';

import Main from './Main';
import QuestionIndex from './QuestionIndex';
import QuestionDetail from './QuestionDetail';
import QuestionForm from './QuestionForm'; //move to QuestionIndex page
import AnswerForm from './AnswerForm'; //move to QuestionDetail page
import Profile from './Profile';
import NavBar from './NavBar';
import Footer from './Footer';


const Router = () => {
    const [classes, setClasses] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({
        username: '',
        email: ''
    });


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
                        email: user.user_email
                    });
                }
            });
    }, [loggedIn]);


    const toggleFade = (e) => {
        if (classes === 'faded') {
            setClasses('not-faded');
        } else {
            setClasses('faded');
        }
    };

    return (
        <BrowserRouter>
            <div className={classes} />
            <NavBar setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
            <Switch>
                <Route exact path="/">
                    <Main toggleFade={toggleFade} />
                </Route>
                <Route exact path="/questions">
                    <QuestionIndex />
                </Route>
                <Route exact path="/questions/new" component={QuestionForm} />
                <Route exact path="/questions/:question_id" component={QuestionDetail} />
                <Route exact path="/questions/:question_id/answers/new" component={AnswerForm} />
                <Route exact path="/profile">
                    <Profile user={user} loggedIn={loggedIn} />
                </Route>
            </Switch>
            <Footer />
        </BrowserRouter>
    );
};

export default Router;
