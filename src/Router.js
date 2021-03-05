import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './Main';
import QuestionIndex from './QuestionIndex';
import QuestionDetail from './QuestionDetail';
import Login from './Login';
import Signup from './Signup';
import NavBar from './NavBar';
import Profile from './Profile';

//change a single state of the Router, which will trigger an update of all the children too....

const Router = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/questions" component={QuestionIndex} />
                <Route exact path="/questions/:id" component={QuestionDetail} />
                <Route exact path="/signup">
                    <Signup title="Signup here" method="POST" route={"http://localhost:3000/signup"} />
                </Route>
                <Route exact callback={setIsLoggedIn} path="/login">
                    <Login />
                </Route>
                <Route exact callback={setIsLoggedIn} path="/profile">
                    <Profile />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};


export default Router;
