import React from 'react';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h3>{this.props.title}</h3>
        <form action='/login' method='POST'>
          <input type='text' name='email' placeholder='email' required/><br/>
          <input type='text' name='password' placeholder='password' required/><br/>
          <button type='submit'>Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
