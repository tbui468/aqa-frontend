import React, { useState, useEffect } from 'react';
import Signup from './Signup';
import './main.css';
import mainImage from './main.jpg';
import PopupBox from './PopupBox';

const Main = (props) => {
    const [signupFormVisible, setSignupFormVisible] = useState(false);

    const openSignup = () => {
        setSignupFormVisible(true);
        props.toggleFade();
    };

    const closeSignup = () => {
        setSignupFormVisible(false);
        props.toggleFade();
    };

    const submitSignup = (e) => {
        e.preventDefault();
        alert('signup info submitted');
    };

    /*
        //this is the signup info that needs to be given to PopupBox
                <div className={"main-signup-overlay " + visible}>
                    <button onClick={closeSignup}>close</button>
                    <Signup
                        title="Signup here"
                        method="POST"
                        route={'http://localhost:3000/signup'}
                    />
                </div>
     */

    return (
        <div id="main-container">
            <div id="main-left-child">
                <img id="main-image" src={mainImage} alt="main image" />
            </div>
            <div id="main-right-child">
                <PopupBox onClose={closeSignup} onSubmit={submitSignup} visible={signupFormVisible} />
                <button id="main-signup-button" onClick={openSignup}>Signup</button>
            </div>
        </div>
    );
};

export default Main;
