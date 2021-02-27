import React from 'react';
import TopNav from './TopNav';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

class App extends React.Component {
  constructor() {
    super(); //must call super otherwise shit breaks
  }

  render() {
    return(
      <div>
        <TopNav />
        <h1>Hello world from imported app componenet</h1>
        <SignupForm title='Sign Up Now!'/>
        <LoginForm title='Already registered?  Log in here.'/>
      </div>
    );
  }
}

export default App;
