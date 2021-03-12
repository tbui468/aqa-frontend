import React, { useState, useEffect } from 'react';
import Signup from './Signup';
import './main.css';
import mainImage from './main.jpg';

const Main = (props) => {
    const [signup, setSignup] = useState(false);
    const [visible, setVisible] = useState('');

    useEffect(() => {
    }, [signup, visible]);

    const openSignup = () => {
        if(signup) return;
        setSignup(true);
        props.toggleFade();
        setVisible('main-signup-visible')
    };

    const closeSignup = () => {
        if(!signup) return;
        setSignup(false);
        props.toggleFade();
        setVisible('')
    };

    return (
        <div id="main-container">
            <div id="main-left-child">
                <img id="main-image" src={mainImage} alt="main image" />
            </div>
            <div id="main-right-child">
                <div className={"main-signup-overlay " + visible}>
                    <button onClick={closeSignup}>close</button>
                    <Signup
                        title="Signup here"
                        method="POST"
                        route={'http://localhost:3000/signup'}
                    />
                </div>
                <button id="main-signup-button" onClick={openSignup}>Signup</button>
            </div>
        </div>
    );
};

export default Main;
