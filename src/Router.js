import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import Signup from './Signup';


const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Main />
                </Route>
                <Route exact path="/signup">
                    <Signup />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};


export default Router;
