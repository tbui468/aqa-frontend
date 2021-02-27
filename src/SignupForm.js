import React from 'react';
import './Form.css';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return( 
      <div>
        <h2>{this.props.title}</h2>
        <form action='/signup' method='POST'>
          <input type='text' name='email' placeholder='email' required/><br/>
          <input type='text' name='password' placeholder='password' required/><br/>
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

export default SignupForm;
