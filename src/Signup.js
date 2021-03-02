import React from 'react';
import './Form.css';

//props: method, route, title
class Signup extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const { title, method, route } = this.props;
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
    }
}

export default Signup;
