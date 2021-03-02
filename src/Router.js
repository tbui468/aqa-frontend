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
                    <Signup title="Signup here" method="POST" route={"http://localhost:3000/signup"} />
                </Route>
                <Route exact path="/login">
                    <Login title="Login here" method="POST" route={"http://localhost:3000/login"} />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};


export default Router;
