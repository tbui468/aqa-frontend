import React, { useState, useEffect } from 'react';
import Signup from './Signup';
import './main.css';
import mainImage from './main.jpg';
import PopupBox from './PopupBox';

const Main = (props) => {
    const [signupFormVisible, setSignupFormVisible] = useState(false);

    const openSignup = () => {
        setSignupFormVisible(true);
        props.toggleOverlay();
    };

    const closeSignup = () => {
        setSignupFormVisible(false);
        props.toggleOverlay();
    };

    return (
        <div id="main-container">
            <div id="main-left-child">
                <img id="main-image" src={mainImage} alt="main image" />
            </div>
            <div id="main-right-child">
                <PopupBox onClose={closeSignup} visible={signupFormVisible}
                    forms={
                        <Signup
                            onSubmit={closeSignup}
                            title="Signup here"
                            method="POST"
                            route={'http://localhost:3000/signup'}
                        />
                    }/>
                <button id="main-signup-button" onClick={openSignup}>Signup</button>
            </div>
        </div>
    );
};

export default Main;
