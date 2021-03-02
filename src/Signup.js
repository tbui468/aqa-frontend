import React from 'react';
import './Form.css';
import PropTypes from 'prop-types';

const Signup = (props) => {
    const { title, method, route } = props;
    return (
        <div>
            <h2>{title}</h2>
            <form action={route} method={method}>
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    required
                    maxLength="30"
                />
                <br />
                <input
                    type="text"
                    name="email"
                    placeholder="email"
                    required
                    maxLength="30"
                />
                <br />
                <input
                    type="text"
                    name="password"
                    placeholder="password"
                    required
                    minLength="5"
                    maxLength="30"
                />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};


Signup.propTypes = {
    title: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired
};

export default Signup;
