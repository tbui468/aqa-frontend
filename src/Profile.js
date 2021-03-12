import React from 'react';
//import { useHistory } from 'react-router-dom';
import AccessDenied from './AccessDenied';

const Profile = (props) => {
    //    const history = useHistory(); //use this to redirect to different route


    return (
        <div>
            {props.loggedIn ? (
                <div>
                    <h1>Profile page</h1>
                    <p>Name: {props.user.username}</p>
                    <p>Email: {props.user.email}</p>
                </div>
            ) : (
                <AccessDenied />
            )}
        </div>
    );
};

export default Profile;
