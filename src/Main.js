import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <Link to="/signup">Signup</Link>
            <br/>
            <Link to="/login">Login</Link>
        </div>
    ); 
};

export default Main;
