import React, { useState } from 'react';
import AccessDenied from './AccessDenied';
import PopupBox from './PopupBox';

const Profile = (props) => {

    const [editFormVisible, setEditFormVisible] = useState(false);

    const openEditForm = () => {
        setEditFormVisible(true);
        props.toggleFade();
    };

    const closeEditForm = () => {
        setEditFormVisible(false);
        props.toggleFade();
    };

    return (
        <div>
            <PopupBox onClose={closeEditForm} visible={editFormVisible} />
            {props.loggedIn ? (
                <div>
                    <h1>Profile page</h1>
                    <p>Name: {props.user.username}</p>
                    <p>Email: {props.user.email}</p>
                    <button onClick={openEditForm} >Edit profile</button>
                </div>
            ) : (
                <AccessDenied />
            )}
        </div>
    );
};

export default Profile;
