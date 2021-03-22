import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Signup from './Signup';
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
        <div className="row">
            <section className="grid">
                <div className="col-3-5">
                    <img className="main-img" src={mainImage} alt="main image" />
                </div>
                <div className="col-2-5">
                    <button className="signup-button" onClick={openSignup}>Signup</button>
                </div>
            </section>
            <PopupBox onClose={closeSignup} visible={signupFormVisible}
                forms={
                    <Signup
                        onSubmit={closeSignup}
                    />
                }/>
        </div>
    );
};

Main.propTypes = {
    toggleOverlay: PropTypes.func
};

export default Main;
