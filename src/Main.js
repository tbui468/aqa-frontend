import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Signup from './Signup';
import './main.css';

//when user clicks sign up button, signup box pops up on screen (still at main page)
//signup should overlay on everything else (will make it animate later)

const Main = () => {
    const [ signup, setSignup ] = useState(false);

    useEffect(() => {
    }, [signup]);

    const handleClick = () => {
        setSignup(!signup);
    };

    return (
        <div id="main-container">
            {signup ? (
                <div id="main-child">
                    <button onClick={handleClick}>close</button>
                    <Signup
                        title="Signup here"
                        method="POST"
                        route={'http://localhost:3000/signup'}
                        />
                </div>
            ) : (
                <div id="main-child">
                    <button onClick={handleClick}>Signup</button>
                </div>
            )}
        </div>
    ); 
};

export default Main;
