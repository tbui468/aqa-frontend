import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import Signup from './Signup';
import NavBar from './NavBar';
import Profile from './Profile';


const Router = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/signup">
                    <Signup title="Signup here" method="POST" route={"http://localhost:3000/signup"} />
                </Route>
                <Route exact path="/login" component={Login} />
                <Route exact path="/profile" component={Profile} />
            </Switch>
        </BrowserRouter>
    );
};


export default Router;
